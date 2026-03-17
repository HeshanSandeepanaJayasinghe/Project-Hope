package com.example.backend.user.repository;

import com.example.backend.user.model.FinanceManager;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FinanceManagerRepository extends MongoRepository<FinanceManager, String> {
}
