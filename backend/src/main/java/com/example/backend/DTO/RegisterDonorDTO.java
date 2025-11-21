package com.example.backend.DTO;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterDonorDTO {

@NotBlank(message = "Name is required")
private String name;

@NotBlank(message = "Email is required")
@Email(message = "Invalid email format")
private String email;

@NotBlank(message = "Password is required")
@Size(min = 6, message = "Password must be at least 6 characters")
private String password;

@NotBlank(message = "Confirm Password is required")
private String confirmPassword;

@NotBlank(message = "Occupation is required")
private String occupation;

@NotBlank(message = "Organization is required")
private String organization;

// ---------- Getters and Setters ----------

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public String getConfirmPassword() {
	return confirmPassword;
}

public void setConfirmPassword(String confirmPassword) {
	this.confirmPassword = confirmPassword;
}

public String getOccupation() {
	return occupation;
}

public void setOccupation(String occupation) {
	this.occupation = occupation;
}

public String getOrganization() {
	return organization;
}

public void setOrganization(String organization) {
	this.organization = organization;
}
}
