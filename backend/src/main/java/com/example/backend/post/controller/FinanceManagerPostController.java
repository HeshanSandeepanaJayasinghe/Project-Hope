package com.example.backend.post.controller;

import com.example.backend.payment.PaymentRepository;
import com.example.backend.payment.PaymentType;
import com.example.backend.payment.model.Payment;
import com.example.backend.post.dto.FinanceManagerPostResponse;
import com.example.backend.post.dto.PoolAllocationRequest;
import com.example.backend.post.model.Post;
import com.example.backend.post.repository.PostRepository;
import com.example.backend.user.model.Recipient;
import com.example.backend.user.repository.RecipientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/finance-manager")
@RequiredArgsConstructor
public class FinanceManagerPostController {

    private final PostRepository postRepository;
    private final PaymentRepository paymentRepository;
    private final RecipientRepository recipientRepository;

    @GetMapping("/posts")
    public ResponseEntity<Map<String, Object>> getFinanceManagerPosts() {
        double poolCredits = paymentRepository.findByTypeAndStatus(PaymentType.POOL, "PAID")
                .stream().mapToDouble(Payment::getAmount).sum();
        double poolDebits = paymentRepository.findByTypeAndStatus(PaymentType.POOL_TRANSFER, "PAID")
                .stream().mapToDouble(Payment::getAmount).sum();
        double poolBalance = Math.max(0, poolCredits - poolDebits);

        List<FinanceManagerPostResponse> allPosts = postRepository.findAll().stream()
                .map(this::toFinanceManagerPostResponse)
                .collect(Collectors.toList());

        List<FinanceManagerPostResponse> readyToRelease = allPosts.stream()
                .filter(post -> post.isFullyFunded() && !post.isDisbursed())
                .collect(Collectors.toList());

        List<FinanceManagerPostResponse> pending = allPosts.stream()
                .filter(post -> !post.isFullyFunded() && !post.isDisbursed())
                .sorted(Comparator
                        .comparingInt((FinanceManagerPostResponse post) -> urgencyScore(post.getPostUrgency()))
                        .reversed()
                        .thenComparingDouble(FinanceManagerPostResponse::getRemainingPercent)
                        .reversed())
                .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of(
                "poolBalance", poolBalance,
                "readyToRelease", readyToRelease,
                "pendingPosts", pending
        ));
    }

    @PostMapping("/posts/{postId}/release")
    public ResponseEntity<Map<String, Object>> releasePostFunds(@PathVariable String postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        double remaining = Math.max(0, post.getTotalAmount() - post.getCurrentAmount());
        if (remaining > 0) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "Post is not fully funded yet",
                    "requiredRemaining", remaining
            ));
        }

        if (post.isDisbursed()) {
            return ResponseEntity.ok(Map.of(
                    "message", "Funds already released",
                    "postId", postId
            ));
        }

        post.setDisbursed(true);
        postRepository.save(post);

        Recipient recipient = recipientRepository.findById(post.getRecipientId()).orElse(null);
        String accountNo = recipient != null ? recipient.getAccountNo() : "";

        return ResponseEntity.ok(Map.of(
                "message", "Funds released to recipient account",
                "postId", postId,
                "accountNo", accountNo,
                "releasedAmount", post.getCurrentAmount()
        ));
    }

    @PatchMapping("/posts/{postId}/allocate")
    public ResponseEntity<Map<String, Object>> allocatePoolToPost(
            @PathVariable String postId,
            @RequestBody PoolAllocationRequest request
    ) {
        if (request.getAmount() <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "Allocation amount must be greater than zero"));
        }

        double poolCredits = paymentRepository.findByTypeAndStatus(PaymentType.POOL, "PAID")
                .stream().mapToDouble(Payment::getAmount).sum();
        double poolDebits = paymentRepository.findByTypeAndStatus(PaymentType.POOL_TRANSFER, "PAID")
                .stream().mapToDouble(Payment::getAmount).sum();
        double poolBalance = Math.max(0, poolCredits - poolDebits);

        if (request.getAmount() > poolBalance) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "Not enough funds available in the pool",
                    "poolBalance", poolBalance
            ));
        }

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        if (post.isDisbursed()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Cannot allocate to a post that has already been released"));
        }

        double remaining = Math.max(0, post.getTotalAmount() - post.getCurrentAmount());
        if (remaining <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "Post is already fully funded"));
        }

        double allocation = Math.min(request.getAmount(), remaining);
        post.setCurrentAmount(post.getCurrentAmount() + allocation);
        post.setRemainingAmount(Math.max(0, post.getTotalAmount() - post.getCurrentAmount()));
        postRepository.save(post);

        Payment poolTransfer = new Payment();
        poolTransfer.setOrderId(UUID.randomUUID().toString());
        poolTransfer.setDonorId("POOL");
        poolTransfer.setPostId(postId);
        poolTransfer.setType(PaymentType.POOL_TRANSFER);
        poolTransfer.setAmount(allocation);
        poolTransfer.setStatus("PAID");
        poolTransfer.setInitiatedBy("FINANCE_MANAGER");
        poolTransfer.setTransactionTime(Instant.now());
        poolTransfer.setTransactionSource("POOL_ALLOCATION");
        poolTransfer.setNote("Finance manager allocated pool funds to post");
        paymentRepository.save(poolTransfer);

        return ResponseEntity.ok(Map.of(
                "message", "Pool allocation successful",
                "allocatedAmount", allocation,
                "remainingAmount", post.getRemainingAmount(),
                "postId", postId
        ));
    }

    private FinanceManagerPostResponse toFinanceManagerPostResponse(Post post) {
        double computedRemaining = Math.max(0, post.getTotalAmount() - post.getCurrentAmount());
        if (Double.compare(post.getRemainingAmount(), computedRemaining) != 0) {
            post.setRemainingAmount(computedRemaining);
            postRepository.save(post);
        }

        Recipient recipient = recipientRepository.findById(post.getRecipientId()).orElse(null);

        FinanceManagerPostResponse dto = new FinanceManagerPostResponse();
        dto.setPostId(post.getPostId());
        dto.setTitle(post.getTitle());
        dto.setDescription(post.getDescription());
        dto.setImageUrl(post.getImageUrl());
        dto.setRecipientId(post.getRecipientId());
        dto.setRecipientName(recipient != null ? recipient.getName() : "Unknown recipient");
        dto.setRecipientAccountNo(recipient != null ? recipient.getAccountNo() : "");
        dto.setPostCategory(post.getPostCategory() != null ? post.getPostCategory().name() : "");
        dto.setPostUrgency(post.getPostUrgency() != null ? post.getPostUrgency().name() : "LOW");
        dto.setCurrentAmount(post.getCurrentAmount());
        dto.setTotalAmount(post.getTotalAmount());
        dto.setRemainingAmount(computedRemaining);
        dto.setRemainingPercent(post.getTotalAmount() > 0 ? (computedRemaining / post.getTotalAmount()) * 100 : 0);
        dto.setDisbursed(post.isDisbursed());
        dto.setFullyFunded(computedRemaining <= 0);
        return dto;
    }

    private int urgencyScore(String urgency) {
        if (urgency == null) {
            return 0;
        }
        return switch (urgency.toUpperCase()) {
            case "HIGH" -> 3;
            case "MEDIUM" -> 2;
            case "LOW" -> 1;
            default -> 0;
        };
    }
}
