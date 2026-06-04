package com.example.backend.payment;

import com.example.backend.payment.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository<Payment, String> {
}