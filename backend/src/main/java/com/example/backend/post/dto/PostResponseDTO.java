package com.example.backend.post.dto;

import com.example.backend.post.model.Post;
import com.example.backend.user.model.Recipient;
import lombok.Data;

import java.time.Instant;

@Data
public class PostResponseDTO {

	private String postId;
	private String recipientId;
	private String title;
	private String description;
	private String imageUrl;
	private double currentAmount;
	private double totalAmount;
	private double remainingAmount;
	private Instant creationTime;
	private Post.PostCategory postCategory;
	private Post.PostUrgency postUrgency;
	private Recipient.VerificationStatus verificationStatus;

}
