package com.example.backend.payment.model;

import com.example.backend.payment.PaymentType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
}