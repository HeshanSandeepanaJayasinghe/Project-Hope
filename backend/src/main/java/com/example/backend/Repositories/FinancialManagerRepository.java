package com.example.backend.Repositories;

import com.example.backend.Model.FinancialManager;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FinancialManagerRepository extends MongoRepository<FinancialManager,String> {
}
