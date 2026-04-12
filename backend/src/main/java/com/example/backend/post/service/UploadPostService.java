package com.example.backend.post.service;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.post.dto.PostRequestDTO;
import com.example.backend.post.model.Post;
import com.example.backend.post.repository.PostRepository;
import com.example.backend.user.model.Recipient;
import com.example.backend.user.repository.RecipientRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Service
public class UploadPostService {

	private final PostRepository postRepository;
	private final RecipientRepository recipientRepository;

	@Value("${image.upload.directory}")
	private  String postImageUploadDirectory;

	public UploadPostService(
			PostRepository postRepository,
			RecipientRepository recipientRepository
	) {
		this.postRepository = postRepository;
		this.recipientRepository = recipientRepository;
	}

	@Transactional
	public Map<String, String> uploadPost(PostRequestDTO postRequestDTO) {

		CustomUserDetails userDetails =
				(CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String userId = userDetails.getUserId();
		Recipient recipient = recipientRepository.findByUserId(userId);
		int postCount = recipient.getPostCount();
		if (postCount>3) {
			throw new IllegalArgumentException("Post limit exceeded: maximum 3 posts allowed");
		}
		String recipientId = recipient.getRecipientId();

		try {
			Path postImagePath = Paths.get(postImageUploadDirectory);
			if (!Files.exists(postImagePath)) {
				Files.createDirectories(postImagePath);
			}

			String uniqueFileName = UUID.randomUUID().toString();
			Path imagePath = postImagePath.resolve(uniqueFileName);
			Files.copy(
				postRequestDTO.getImageFile().getInputStream(),
				imagePath,
				StandardCopyOption.REPLACE_EXISTING
			);

		Post post = new Post();
		post.setRecipientId(recipientId);
		Post.PostCategory category = Post.PostCategory.valueOf(postRequestDTO.getPostCategory());		post.setDescription(postRequestDTO.getDescription());
		post.setTitle(postRequestDTO.getTitle());
		post.setImageUrl("http://localhost:8080/open/get/image/"+uniqueFileName);
		post.setTotalAmount(postRequestDTO.getDonationTarget());
		post.setCurrentAmount(0);
		post.setRemainingAmount(0);
		post.setPostUrgency(Post.PostUrgency.MEDIUM);
		post.setVerificationStatus(recipient.getVerificationStatus());
		post.setCreationTime(Instant.now());
		postRepository.save(post);
		recipient.setPostCount(postCount+1);
		recipientRepository.save(recipient);

		return Map.of("Message", "Successfully created the post.");

		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
