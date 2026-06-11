package com.example.backend.user.service;

import com.example.backend.user.dto.EditRecipientStatusDTO;
import com.example.backend.user.model.Recipient;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.example.backend.user.model.Verification;
import com.example.backend.authentication.CustomUserDetails;

import com.example.backend.user.model.VerificationHistory;
import com.example.backend.user.repository.VerificationHistoryRepository;

@Service
public class SetRecipientStatusService {

	private final MongoTemplate mongoTemplate;
	private final VerificationHistoryRepository verificationHistoryRepository;

	public SetRecipientStatusService(MongoTemplate mongoTemplate, VerificationHistoryRepository verificationHistoryRepository) {
		this.mongoTemplate = mongoTemplate;
		this.verificationHistoryRepository = verificationHistoryRepository;
	}

	public Map<String, String> setRecipientStatus(EditRecipientStatusDTO editRecipientStatusDTO) {

		CustomUserDetails userDetails =
				(CustomUserDetails) org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String verifierUserId = userDetails.getUserId();

		Query query = new Query(Criteria.where("recipientId").is(editRecipientStatusDTO.getRecipientId()));
		
		// Fetch existing to track history
		Recipient existingRecipient = mongoTemplate.findOne(query, Recipient.class);
		String previousState = existingRecipient != null && existingRecipient.getVerificationStatus() != null 
				? existingRecipient.getVerificationStatus().name() 
				: "UNKNOWN";
		
		Verification existingVerification = mongoTemplate.findOne(query, Verification.class);
		String verificationId = existingVerification != null ? existingVerification.getVerificationId() : null;

		// Create History Record
		VerificationHistory history = new VerificationHistory();
		history.setVerificationId(verificationId);
		history.setVerifierUserId(verifierUserId);
		history.setPreviousState(previousState);
		history.setNewState(editRecipientStatusDTO.getStatus());
		history.setVerificationTimeStamp(java.time.LocalDateTime.now().toString());
		history.setPdfViewed(editRecipientStatusDTO.isPdfViewed());
		
		verificationHistoryRepository.save(history);

		// Update Recipient
		Update updateRecipient = new Update().set(
				"verificationStatus", Recipient.VerificationStatus.valueOf(editRecipientStatusDTO.getStatus()));
		mongoTemplate.updateFirst(query, updateRecipient, Recipient.class);

		// Update Verification
		Update updateVerification = new Update()
				.set("verifiedBy", verifierUserId)
				.set("verificationTimeStamp", history.getVerificationTimeStamp())
				.set("pdfViewed", editRecipientStatusDTO.isPdfViewed());
		
		mongoTemplate.updateFirst(query, updateVerification, Verification.class);
		
		return Map.of("Message", "Successfully updated the recipient status.");
	}
}
