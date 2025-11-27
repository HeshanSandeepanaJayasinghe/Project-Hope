package com.example.backend.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
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


}
