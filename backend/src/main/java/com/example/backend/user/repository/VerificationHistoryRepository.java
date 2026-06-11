package com.example.backend.user.repository;

import com.example.backend.user.model.VerificationHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationHistoryRepository extends MongoRepository<VerificationHistory, String> {
}
