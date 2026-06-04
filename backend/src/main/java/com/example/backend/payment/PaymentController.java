package com.example.backend.payment;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.payment.model.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final com.example.backend.payment.PayHereService payHereService;
    private final com.example.backend.payment.PaymentRepository paymentRepository;

    @PostMapping(value = "/pay", produces = MediaType.TEXT_HTML_VALUE)
    public String pay(@RequestBody com.example.backend.payment.PaymentRequest request) {

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

        return payHereService.generateCheckoutForm(orderId, request.getAmount());
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

            payment.setStatus("PAID");
            paymentRepository.save(payment);

            if (payment.getType() == PaymentType.POOL) {
                System.out.println("POOL donation added: " + payment.getAmount());
            }

            if (payment.getType() == PaymentType.POST) {
                System.out.println("POST donation added: " + payment.getPostId());
            }
        }

        return "OK";
    }
}