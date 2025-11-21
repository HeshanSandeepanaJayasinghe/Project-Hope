package com.example.backend.Repositories;

import com.example.backend.Model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DonorRepository extends MongoRepository<Donor,String> {
}
