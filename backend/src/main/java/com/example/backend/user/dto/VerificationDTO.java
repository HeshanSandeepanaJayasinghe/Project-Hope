package com.example.backend.user.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerificationDTO {

	@NotBlank(message = "Province is required")
	private String province;

	@NotBlank(message = "District is required")
	private String district;

	@NotBlank(message = "Divisional secretarial is required")
	private String divisionalSecretarial;

	@NotBlank(message = "Grama Niladhari division is required")
	private String gramaNiladhariDivision;

	@NotBlank(message = "Account number is required")
	@Pattern(regexp = "^[A-Za-z0-9]{6,20}$", message = "Account number must be 6-20 alphanumeric characters")
	private String accountNo;

	@NotBlank(message = "Employment category is required")
	private String employmentCategory;

	@NotBlank(message = "Occupation is required")
	private String occupation;

	@NotNull(message = "Annual salary is required")
	@Positive(message = "Annual salary must be positive")
	private Double annualSalary;

	@NotBlank(message = "Asset status is required")
	private String assetStatus;

	@NotNull(message = "Number of family members is required")
	@Min(value = 1, message = "Number of family members must be at least 1")
	@Max(value = 20, message = "Number of family members cannot exceed 20")
	private Integer numberOfFamilyMembers;

	private String longTermHealthIssues;

	@AssertTrue(message = "You must agree to the terms and conditions")
	private boolean agreeToTerms;

	@NotNull(message = "Verification document is required")
	private MultipartFile verificationDocument;
}