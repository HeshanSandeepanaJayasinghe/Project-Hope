package com.example.backend.payment;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.payment.model.Payment;
import com.example.backend.post.model.Post;
import com.example.backend.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final com.example.backend.payment.PayHereService payHereService;
    private final com.example.backend.payment.PaymentRepository paymentRepository;
    private final PostRepository postRepository;

    @PostMapping(value = "/pay", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> pay(@RequestBody com.example.backend.payment.PaymentRequest request) {

        CustomUserDetails user =
                (CustomUserDetails) SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getPrincipal();

        String donorId = user.getUserId();
        String orderId = UUID.randomUUID().toString();

        Payment payment = new Payment(
                orderId,
                donorId,
                request.getPostId(),
                request.getType(),
                request.getAmount(),
                "PENDING"
        );

        paymentRepository.save(payment);

        String html = payHereService.generateCheckoutForm(orderId, request.getAmount(), request.getReturnUrl());
        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .body(html);
    }

    /**
     * Called by the frontend after returning from PayHere to confirm and process the payment.
     * This is needed for local development where PayHere can't reach localhost notify_url.
     */
    @PostMapping("/confirm/{orderId}")
    public ResponseEntity<?> confirmPayment(@PathVariable String orderId) {

        Payment payment = paymentRepository.findById(orderId).orElse(null);
        if (payment == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Payment not found"));
        }

        // Already processed — avoid double-processing
        if ("PAID".equals(payment.getStatus())) {
            return ResponseEntity.ok(Map.of("message", "Payment already processed"));
        }

        processPayment(payment);

        return ResponseEntity.ok(Map.of("message", "Payment confirmed and processed"));
    }


    @PostMapping("/notify")
    public String notifyPayment(
            @RequestParam String merchant_id,
            @RequestParam String order_id,
            @RequestParam String payhere_amount,
            @RequestParam String payhere_currency,
            @RequestParam String status_code,
            @RequestParam String md5sig
    ) {

        boolean verified = payHereService.verifyPayment(
                merchant_id,
                order_id,
                payhere_amount,
                payhere_currency,
                status_code,
                md5sig
        );

        if (verified && "2".equals(status_code)) {

            Payment payment = paymentRepository.findById(order_id)
                    .orElseThrow();

            // Avoid double-processing if /confirm already handled it
            if (!"PAID".equals(payment.getStatus())) {
                processPayment(payment);
            }
        }

        return "OK";
    }

    /**
     * Shared logic to mark a payment as PAID and update post amounts.
     */
    private void processPayment(Payment payment) {

        payment.setStatus("PAID");
        paymentRepository.save(payment);

        if (payment.getType() == PaymentType.POOL) {
            System.out.println("POOL donation added: " + payment.getAmount());
        }

        if (payment.getType() == PaymentType.POST) {
            Post post = postRepository.findById(payment.getPostId()).orElse(null);
            if (post != null) {
                double donation = payment.getAmount();
                double currentAmount = post.getCurrentAmount();
                double totalAmount = post.getTotalAmount();
                double remaining = Math.max(0, totalAmount - currentAmount);

                if (donation >= remaining) {
                    double excess = donation - remaining;
                    double appliedToPost = remaining;

                    post.setCurrentAmount(Math.min(currentAmount + appliedToPost, totalAmount));
                    post.setRemainingAmount(0);

                    if (appliedToPost > 0) {
                        payment.setAmount(appliedToPost);
                        paymentRepository.save(payment);
                        System.out.println("POST donation added: " + appliedToPost + ".");
                    }

                    if (excess > 0) {
                        Payment poolPayment = new Payment(
                                UUID.randomUUID().toString(),
                                payment.getDonorId(),
                                null,
                                PaymentType.POOL,
                                excess,
                                "PAID"
                        );
                        paymentRepository.save(poolPayment);
                        System.out.println("Excess " + excess + " sent to POOL.");
                    }
                } else {
                    post.setCurrentAmount(currentAmount + donation);
                    post.setRemainingAmount(remaining - donation);
                    System.out.println("POST donation added: " + donation);
                }
                postRepository.save(post);
            } else {
                System.out.println("POST donation added but post not found: " + payment.getPostId());
            }
        }
    }
}