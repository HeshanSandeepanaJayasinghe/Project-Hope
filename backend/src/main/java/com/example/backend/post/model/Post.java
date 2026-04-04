package com.example.backend.post.model;

import com.example.backend.user.model.Recipient;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collation = "post")
public class Post {

	@Id
	private String postId;
	private String recipientId;
	private String title;
	private String description;
	private String imageUrl;
	private double currentAmount;
	private double totalAmount;
	private double remainingAmount;
	private Instant creationTime;
	private PostCategory postCategory;
	private Recipient.VerificationStatus verificationStatus;

	public enum PostCategory {
		FINANCIAL,
		EDUCATION,
		HEALTH,
		GOODS
	}

}
