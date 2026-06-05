package com.example.backend.payment.model;

import com.example.backend.payment.PaymentType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "payments")
public class Payment {

    @Id
    private String orderId;

    private String donorId;

    private String postId; // null for POOL

    private PaymentType type;

    private double amount;

    private String status; // PENDING, PAID, FAILED

    private String initiatedBy;

    private Instant transactionTime;

    private String transactionSource;

    private String note;

    public Payment(String orderId, String donorId, String postId, PaymentType type, double amount, String status) {
        this.orderId = orderId;
        this.donorId = donorId;
        this.postId = postId;
        this.type = type;
        this.amount = amount;
        this.status = status;
    }
}