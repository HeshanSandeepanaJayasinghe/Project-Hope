package com.example.backend.user.repository;

import com.example.backend.user.model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DonorRepository extends MongoRepository<Donor, String> {
}
