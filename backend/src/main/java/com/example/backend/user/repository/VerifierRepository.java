package com.example.backend.user.repository;

import com.example.backend.user.model.Verifier;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VerifierRepository extends MongoRepository<Verifier,String> {
}
