package com.example.backend.Repositories;

import com.example.backend.Model.Post;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post,String> {
	long countByUserId(ObjectId userId);
}
