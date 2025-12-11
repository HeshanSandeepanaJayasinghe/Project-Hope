package com.example.backend.Repositories;

import com.example.backend.Model.FundraiserVerification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VerificationFundraiser extends MongoRepository<FundraiserVerification,String> {
}
