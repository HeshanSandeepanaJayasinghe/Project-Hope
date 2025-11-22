package com.example.backend.DTO;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class RegisterFundraiserDTO {

@NotBlank(message = "Name is required")
private String name;

@NotBlank(message = "Email is required")
@Email(message = "Invalid email format")
private String email;

@NotBlank(message = "Password is required")
@Size(min = 6, message = "Password must be at least 6 characters long")
private String password;

@NotBlank(message = "Confirm password is required")
private String confirmPassword;

@NotBlank(message = "NIC is required")
@Pattern(regexp = "^[0-9]{9}[vVxX]$|^[0-9]{12}$",
	message = "NIC must be 9 digits + V OR 12 digits")
private String nic;

@NotBlank(message = "Birthday is required")
private LocalDate birthday;  // or LocalDate if your frontend sends YYYY-MM-DD

@NotBlank(message = "Telephone number is required")
@Pattern(regexp = "^[0-9]{10}$", message = "Telephone must be 10 digits")
private String telephone;

@NotBlank(message = "Address is required")
private String address;

@NotBlank(message = "Postal code is required")
private String postalCode;

@AssertTrue(message = "You must agree to the terms and conditions")
private boolean agreedToTerms;

public RegisterFundraiserDTO() {}

// ---------- Getters & Setters ----------

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

public String getNic() {
	return nic;
}

public void setNic(String nic) {
	this.nic = nic;
}

public LocalDate getBirthday() {
	return birthday;
}

public void setBirthday(LocalDate birthday) {
	this.birthday = birthday;
}

public String getTelephone() {
	return telephone;
}

public void setTelephone(String telephone) {
	this.telephone = telephone;
}

public String getAddress() {
	return address;
}

public void setAddress(String address) {
	this.address = address;
}

public String getPostalCode() {
	return postalCode;
}

public void setPostalCode(String postalCode) {
	this.postalCode = postalCode;
}

public boolean isAgreedToTerms() {
	return agreedToTerms;
}

public void setAgreedToTerms(boolean agreedToTerms) {
	this.agreedToTerms = agreedToTerms;
}
}
