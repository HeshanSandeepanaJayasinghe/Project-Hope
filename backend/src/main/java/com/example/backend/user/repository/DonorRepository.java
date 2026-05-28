package com.example.backend.user.repository;

import com.example.backend.user.model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DonorRepository extends MongoRepository<Donor, String> {

    Optional<Donor> findByUserId(String userId);
}
