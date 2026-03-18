package com.example.backend.user.repository;

import com.example.backend.user.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin, String> {

	void deleteByUserId(String userId);


}
