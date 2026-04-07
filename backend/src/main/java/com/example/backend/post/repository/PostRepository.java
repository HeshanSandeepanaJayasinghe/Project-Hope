package com.example.backend.post.repository;

import com.example.backend.post.model.Post;
import org.jspecify.annotations.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {

	List<Post> findByRecipientId(String recipientId);

	void deleteById(@NonNull String postId);

}
