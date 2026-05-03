package com.example.backend.user.service;

import com.example.backend.user.model.Recipient;
import com.example.backend.user.model.User;
import com.example.backend.user.model.Verification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RecipientDeleteService {

	@Autowired
	private MongoTemplate mongoTemplate;

	@Transactional
	public boolean deleteRecipientCompletely(String userId) {
		try {
			Query recipientQuery = new Query(Criteria.where("userId").is(userId));
			Recipient recipient = mongoTemplate.findOne(recipientQuery, Recipient.class);

			if (recipient == null) {
				return false;
			}

			String recipientId = recipient.getRecipientId();

			mongoTemplate.remove(recipientQuery, Recipient.class);

			if (recipientId != null) {
				Query verificationQuery = new Query(Criteria.where("recipientId").is(recipientId));
				mongoTemplate.remove(verificationQuery, Verification.class);
			}

			Query userQuery = new Query(Criteria.where("userId").is(userId));
			User user = mongoTemplate.findOne(userQuery, User.class);

			if (user != null && user.getRoles() != null && user.getRoles().contains(User.Role.RECIPIENT)) {
				mongoTemplate.remove(userQuery, User.class);
			}

			return true;

		} catch (Exception e) {
			throw new RuntimeException("Failed to delete recipient: " + e.getMessage());
		}
	}

	@Transactional
	public boolean deleteRecipientByRecipientId(String recipientId) {
		try {
			Recipient recipient = mongoTemplate.findById(recipientId, Recipient.class);
			if (recipient == null) {
				return false;
			}

			String userId = recipient.getUserId();

			mongoTemplate.remove(new Query(Criteria.where("recipientId").is(recipientId)), Recipient.class);
			mongoTemplate.remove(new Query(Criteria.where("recipientId").is(recipientId)), Verification.class);

			if (userId != null) {
				mongoTemplate.remove(new Query(Criteria.where("userId").is(userId)), User.class);
			}

			return true;

		} catch (Exception e) {
			throw new RuntimeException("Failed to delete recipient: " + e.getMessage());
		}
	}
}