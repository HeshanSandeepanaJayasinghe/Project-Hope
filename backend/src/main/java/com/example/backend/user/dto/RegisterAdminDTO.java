package com.example.backend.user.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterAdminDTO {

	@NotBlank(message = "Email is required")
	@Email(message = "Email format is invalid")
	private String email;

	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password must be at least 8 characters")
	private String password;

	@NotBlank(message = "Phone number is required")
	@Pattern(
			regexp = "^[0-9]{10}$",
			message = "Phone number must be exactly 10 digits"
	)
	private String phoneNumber;

	@NotBlank(message = "First name is required")
	@Size(max = 50, message = "First name cannot exceed 50 characters")
	private String firstName;

	@NotBlank(message = "Last name is required")
	@Size(max = 50, message = "Last name cannot exceed 50 characters")
	private String lastName;

}