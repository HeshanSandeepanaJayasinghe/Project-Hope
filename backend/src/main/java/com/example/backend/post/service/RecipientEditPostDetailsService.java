package com.example.backend.post.service;

import com.example.backend.post.dto.EditPostDetailsDTO;
import com.example.backend.post.model.Post;
import com.example.backend.post.repository.PostRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class RecipientEditPostDetailsService {

	private final PostRepository postRepository;
	private final MongoTemplate mongoTemplate;

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
			Post existingPost = mongoTemplate.findOne(findQuery, Post.class);
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
//
//		if (dto.getImage() != null && !dto.getImage().isEmpty()) {
//			String imageUrl = uploadImage(dto.getImage());
//			update.set("imageUrl", imageUrl);
//		}

		if (update.getUpdateObject().isEmpty()) {
			return Map.of("Message", "No fields provided to update");
		}

		mongoTemplate.updateFirst(query, update, Post.class);

		return Map.of(
				"Message", "Post updated successfully",
				"PostId", dto.getPostId()
		);
	}

//	private String uploadImage(MultipartFile image) {
//		if (image == null || image.isEmpty()) {
//			throw new RuntimeException("Image file is empty");
//		}
//
//		// TODO: Implement actual image upload logic
//		// Example: Upload to AWS S3, Cloudinary, or local storage
//		// String imageUrl = cloudinaryService.upload(image);
//		// return imageUrl;
//
//		return "image-url-here";
//	}
}