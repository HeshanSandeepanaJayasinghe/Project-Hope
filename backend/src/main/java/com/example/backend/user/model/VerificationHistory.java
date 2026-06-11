package com.example.backend.user.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "verification_history")
@Data
public class VerificationHistory {

	@Id
	private String historyId;
	private String verificationId;
	private String verifierUserId;
	private String previousState;
	private String newState;
	private String verificationTimeStamp;
	private boolean pdfViewed;

}
