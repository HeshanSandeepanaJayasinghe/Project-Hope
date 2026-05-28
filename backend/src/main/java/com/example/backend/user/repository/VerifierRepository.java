package com.example.backend.user.repository;

import com.example.backend.user.model.Verifier;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VerifierRepository extends MongoRepository<Verifier,String> {

	void deleteByUserId(String userId);

	Optional<Verifier> findByUserId(String userId);

}
