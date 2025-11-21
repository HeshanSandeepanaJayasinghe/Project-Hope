package com.example.backend.Repositories;

import com.example.backend.Model.Fundraiser;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface FundraiserRepository extends MongoRepository<Fundraiser,String> {
}
