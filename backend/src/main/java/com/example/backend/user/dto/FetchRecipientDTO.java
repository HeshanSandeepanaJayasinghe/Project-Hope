package com.example.backend.user.dto;

import com.example.backend.user.model.Recipient;
import lombok.Data;

@Data
public class FetchRecipientDTO {

	private String email;
	private String userId;

	private String recipientId;
	private String name;
	private String nic;
	private String birthday;
	private String address;
	private String postalCode;
	private String accountNo;
	private String phoneNumber;
	private int postCount;
	private Recipient.VerificationStatus verificationStatus;

	private String verificationId;
	private String province;
	private String district;
	private String divisionalSecretarial;
	private String gramaNiladhariDivision;
	private String employmentCategory;
	private String occupation;
	private Double annualSalary;
	private String assetStatus;
	private Integer numberOfFamilyMembers;
	private String longTermHealthIssues;
	private String documentUrl;
	private String verifiedBy;
}
