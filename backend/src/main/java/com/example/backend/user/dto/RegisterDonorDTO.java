package com.example.backend.user.dto;


import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterDonorDTO {

	@NotBlank(message = "Name is required")
	@Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
	private String name;

	@NotBlank(message = "NIC is required")
	@Pattern(regexp = "^[0-9]{9,12}[vV]?$", message = "Invalid NIC format")
	private String nic;

	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	private String email;

	@NotBlank(message = "Organization is required")
	private String organization;

	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password must be at least 8 characters")
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$",
			message = "Password must contain at least one digit, one lowercase, one uppercase, and one special character")
	private String password;

	@NotBlank(message = "Confirm password is required")
	private String confirmPassword;

	@NotBlank(message = "Occupation is required")
	private String occupation;

	@AssertTrue(message = "You must agree to the terms and conditions")
	private boolean agreeToTerms;

}