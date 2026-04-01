package com.example.backend.user.repository;

import com.example.backend.user.model.Recipient;
import com.example.backend.user.projection.RecipientIdOnly;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipientRepository extends MongoRepository<Recipient, String> {

	RecipientIdOnly findByUserId(String userId);
}