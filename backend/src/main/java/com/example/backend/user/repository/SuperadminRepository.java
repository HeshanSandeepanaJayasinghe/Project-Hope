package com.example.backend.user.repository;

import com.example.backend.user.model.Superadmin;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SuperadminRepository extends MongoRepository<Superadmin, String> {

    Optional<Superadmin> findByUserId(String userId);

}
