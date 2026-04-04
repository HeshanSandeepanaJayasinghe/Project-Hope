package com.example.backend.post.dto;

import com.example.backend.post.model.Post;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostRequestDTO {

	@NotBlank(message = "Title is required")
	@Size(max = 200, message = "Title must not exceed 200 characters")
	private String title;

	@NotBlank(message = "Category is required")
	private String postCategory;

	@NotBlank(message = "Description is required")
	@Size(max = 2000, message = "Description must not exceed 2000 characters")
	private String description;

	@NotNull(message = "Donation target is required")
	@DecimalMin(value = "0.01", message = "Donation target must be at least 0.01")
	@DecimalMax(value = "999999999.99", message = "Donation target is too high")
	private double donationTarget;

	private MultipartFile imageFile;


}
