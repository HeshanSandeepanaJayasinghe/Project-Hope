package com.example.backend.payment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {

    private com.example.backend.payment.PaymentType type;

    private String postId; // optional for POOL

    private double amount;

    private String returnUrl;
}