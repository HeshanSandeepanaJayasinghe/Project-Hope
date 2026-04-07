package com.example.backend.post.service;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.post.model.Post;
import com.example.backend.post.repository.PostRepository;
import com.example.backend.user.model.Recipient;
import com.example.backend.user.repository.RecipientRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipientGetPostsService {

	private final PostRepository postRepository;
	private final RecipientRepository recipientRepository;

	public RecipientGetPostsService(
			PostRepository postRepository,
			RecipientRepository recipientRepository
	) {
		this.postRepository = postRepository;
		this.recipientRepository = recipientRepository;
	}

	public List<Post> getAllPosts() {

		CustomUserDetails user =
				(CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String userId = user.getUserId();
		String recipientId = recipientRepository.findByUserId(userId).getRecipientId();

		return postRepository.findByRecipientId(recipientId);
	}
}
