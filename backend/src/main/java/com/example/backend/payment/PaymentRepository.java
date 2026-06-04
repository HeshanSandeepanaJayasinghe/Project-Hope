package com.example.backend.payment;

import com.example.backend.payment.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PaymentRepository extends MongoRepository<Payment, String> {

    List<Payment> findByTypeAndStatus(PaymentType type, String status);

}