package com.example.backend.post.service;

import com.example.backend.post.dto.EditPostDetailsDTO;
import com.example.backend.post.model.Post;
import com.example.backend.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;

@Service
public class RecipientEditPostDetailsService {

	private final PostRepository postRepository;
	private final MongoTemplate mongoTemplate;
	@Value("${image.upload.directory}")
	private String postImageUploadDirectory;

	public RecipientEditPostDetailsService(
			PostRepository postRepository,
			MongoTemplate mongoTemplate
	) {
		this.postRepository = postRepository;
		this.mongoTemplate = mongoTemplate;
	}

	public Map<String, String> editPostDetails(EditPostDetailsDTO dto) {



		if (dto.getPostId() == null || dto.getPostId().isEmpty()) {
			throw new RuntimeException("Post ID is required");
		}

		if (!postRepository.existsById(dto.getPostId())) {
			throw new RuntimeException("Post not found with id: " + dto.getPostId());
		}

		Query query = new Query(Criteria.where("_id").is(dto.getPostId()));
		Post existingPost = mongoTemplate.findOne(query, Post.class);
		Update update = new Update();

		if (dto.getTitle() != null && !dto.getTitle().trim().isEmpty()) {
			update.set("title", dto.getTitle().trim());
		}

		if (dto.getDescription() != null && !dto.getDescription().trim().isEmpty()) {
			update.set("description", dto.getDescription().trim());
		}

		if (dto.getTotalAmount() > 0) {
			update.set("totalAmount", dto.getTotalAmount());

			Query findQuery = new Query(Criteria.where("_id").is(dto.getPostId()));
			existingPost = mongoTemplate.findOne(findQuery, Post.class);
			if (existingPost != null) {
				double newRemaining = dto.getTotalAmount() - existingPost.getCurrentAmount();
				update.set("remainingAmount", newRemaining);
			}
		}

		if (dto.getRemainingAmount() >= 0) {
			update.set("remainingAmount", dto.getRemainingAmount());
		}

		if (dto.getPostCategory() != null) {
			update.set("postCategory", dto.getPostCategory());
		}

		if (dto.getImage() != null && !dto.getImage().isEmpty()) {
			try {
				Path postImagePath = Paths.get(postImageUploadDirectory);
				if (!Files.exists(postImagePath)) {
					Files.createDirectories(postImagePath);
				}
				String imageUrl = existingPost.getImageUrl();
				String uniqueFileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
				Path imagePath = postImagePath.resolve(uniqueFileName);
				Files.copy(
						dto.getImage().getInputStream(),
						imagePath,
						StandardCopyOption.REPLACE_EXISTING
				);

			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}

		if (update.getUpdateObject().isEmpty()) {
			return Map.of("Message", "No fields provided to update");
		}

		mongoTemplate.updateFirst(query, update, Post.class);

		return Map.of(
				"Message", "Post updated successfully",
				"PostId", dto.getPostId()
		);
	}

}