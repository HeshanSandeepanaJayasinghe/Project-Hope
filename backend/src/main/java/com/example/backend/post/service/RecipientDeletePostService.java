package com.example.backend.post.service;

import com.example.backend.post.repository.PostRepository;
import com.example.backend.user.repository.RecipientRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RecipientDeletePostService {

	private final PostRepository postRepository;
	private final RecipientRepository recipientRepository;

	public RecipientDeletePostService(
			PostRepository postRepository,
			RecipientRepository recipientRepository
	) {
		this.postRepository = postRepository;
		this.recipientRepository = recipientRepository;
	}

	public Map<String , String> deletePost(String postId){
		postRepository.deleteById(postId);
		return Map.of("Message", "Successfully deleted the post.");
	}
}
