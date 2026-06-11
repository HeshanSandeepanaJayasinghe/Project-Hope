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

@Service
public class SetRecipientStatusService {

	private final MongoTemplate mongoTemplate;

	public SetRecipientStatusService(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
	}

	public Map<String, String> setRecipientStatus(EditRecipientStatusDTO editRecipientStatusDTO) {

		CustomUserDetails userDetails =
				(CustomUserDetails) org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String verifierUserId = userDetails.getUserId();

		Query query = new Query(Criteria.where("recipientId").is(editRecipientStatusDTO.getRecipientId()));
		Update updateRecipient = new Update().set(
				"verificationStatus", Recipient.VerificationStatus.valueOf(editRecipientStatusDTO.getStatus()));

		mongoTemplate.updateFirst(query, updateRecipient, Recipient.class);

		Update updateVerification = new Update()
				.set("verifiedBy", verifierUserId)
				.set("verificationTimeStamp", editRecipientStatusDTO.getVerificationTimeStamp())
				.set("pdfViewed", editRecipientStatusDTO.isPdfViewed());
		
		mongoTemplate.updateFirst(query, updateVerification, Verification.class);
		return Map.of("Message", "Successfully updated the recipient status.");
	}
}
