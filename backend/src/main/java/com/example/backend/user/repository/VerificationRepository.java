package com.example.backend.user.repository;

import com.example.backend.user.model.Verification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VerificationRepository extends MongoRepository<Verification, String> {
}
