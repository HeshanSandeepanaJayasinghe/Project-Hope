package com.example.backend.user.dto;

import lombok.Data;

@Data
public class VerificationHistoryDTO {

	private String historyId;
	private String verificationId;
	private String verifierUserId;
	private String previousState;
	private String newState;
	private String verificationTimeStamp;
	private boolean pdfViewed;

}
