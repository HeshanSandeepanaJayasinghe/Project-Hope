package com.example.backend.user.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipient")
@Data
@NoArgsConstructor
public class Recipient {

	@Id
	private String recipientId;
	private String userId;
	private String name;
	private String nic;
	private String birthday;
	private String address;
	private String postalCode;
	private String accountNo;
	private String phoneNUmber;
	private int postCount;
	private VerificationStatus verificationStatus;
	private boolean verificationSubmitted;

	public enum VerificationStatus {
		VERIFIED,
		UNVERIFIED,
		FRAUD
	}

}