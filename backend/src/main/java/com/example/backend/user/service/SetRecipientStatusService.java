package com.example.backend.user.service;

import com.example.backend.user.dto.EditRecipientStatusDTO;
import com.example.backend.user.model.Recipient;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SetRecipientStatusService {

	private final MongoTemplate mongoTemplate;

	public SetRecipientStatusService(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
	}

	public Map<String, String> setRecipientStatus(EditRecipientStatusDTO editRecipientStatusDTO) {

		Query query = new Query(Criteria.where("recipientId").is(editRecipientStatusDTO.getRecipientId()));
		Update update = new Update().set(
				"verificationStatus", Recipient.VerificationStatus.valueOf(editRecipientStatusDTO.getStatus()));

		mongoTemplate.updateFirst(query, update, Recipient.class);
		return Map.of("Message", "Successfully updated the recipient status.");
	}
}
