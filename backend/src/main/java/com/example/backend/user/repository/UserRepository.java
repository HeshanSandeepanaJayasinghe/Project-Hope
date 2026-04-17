package com.example.backend.user.repository;

import com.example.backend.user.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

	boolean existsByEmail(String email);

	Optional<User> findByEmail(String username);

	Optional<User> findByUserId(String userId);

}
