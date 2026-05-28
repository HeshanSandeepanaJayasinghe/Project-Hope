package com.example.backend.user.repository;

import com.example.backend.user.model.FinanceManager;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FinanceManagerRepository extends MongoRepository<FinanceManager, String> {

	void deleteByUserId(String userId);

	Optional<FinanceManager> findByUserId(String userId);

}
