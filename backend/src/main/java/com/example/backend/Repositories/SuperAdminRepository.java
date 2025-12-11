package com.example.backend.Repositories;

import com.example.backend.Model.SuperAdmin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SuperAdminRepository extends MongoRepository<SuperAdmin,String> {
}
