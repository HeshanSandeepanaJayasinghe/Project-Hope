package com.example.backend.user.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "verifications")
@Data
public class Verification {

	@Id
	private String verificationId;
	private String recipientId;
	private String province;
	private String district;
	private String divisionalSecretarial;
	private String gramaNiladhariDivision;
	private String employmentCategory;
	private String occupation;
	private Double annualSalary;
	private String accountNo;
	private String assetStatus;
	private Integer numberOfFamilyMembers;
	private String longTermHealthIssues;
	private String documentUrl;
	private String verifiedBy;

}