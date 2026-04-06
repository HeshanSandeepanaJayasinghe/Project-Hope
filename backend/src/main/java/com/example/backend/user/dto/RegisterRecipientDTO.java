package com.example.backend.user.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRecipientDTO {

	@NotBlank(message = "Name is required")
	@Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
	@Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Name must contain only letters and spaces")
	private String name;

	@NotBlank(message = "NIC is required")
	@Pattern(regexp = "^[0-9]{9,12}[vV]?$", message = "Invalid NIC format. Must be 9-12 digits, optionally ending with v or V")
	private String nic;

	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	@Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
	private String email;

	@NotBlank(message = "Birthday is required")
	@Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Birthday must be in format YYYY-MM-DD")
	private String birthday;

	@NotBlank(message = "Address is required")
	@Size(min = 5, max = 255, message = "Address must be between 5 and 255 characters")
	private String address;

	@NotBlank(message = "Postal code is required")
	@Pattern(regexp = "^[0-9]{4,10}$", message = "Invalid postal code format. Must be 4-10 digits")
	private String postalCode;



	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password must be at least 8 characters")
	@Pattern(
			regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).*$",
			message = "Password must contain at least one digit, one lowercase, one uppercase, and one special character"
	)
	private String password;

	@NotBlank(message = "Confirm password is required")
	private String confirmPassword;
}
