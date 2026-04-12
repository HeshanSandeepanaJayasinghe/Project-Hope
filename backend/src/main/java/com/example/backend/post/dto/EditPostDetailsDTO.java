package com.example.backend.post.dto;

import com.example.backend.post.model.Post;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class EditPostDetailsDTO {

	private String title;
	private String postId;
	private String description;
	private double totalAmount;
	private double remainingAmount;
	private Post.PostCategory postCategory;
	private MultipartFile image;


}
