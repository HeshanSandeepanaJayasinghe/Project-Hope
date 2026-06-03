package com.example.backend.user.service;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.user.dto.UpdateAdministratorDTO;
import com.example.backend.user.model.User;
import com.example.backend.user.model.Verifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UpdateVerifierDetailsService {

	private final MongoTemplate mongoTemplate;
	private final PasswordEncoder passwordEncoder;

	public UpdateVerifierDetailsService(
			MongoTemplate mongoTemplate,
			PasswordEncoder passwordEncoder
	) {
		this.mongoTemplate = mongoTemplate;
		this.passwordEncoder = passwordEncoder;
	}

	public Map<String, String> updateVerifierDetails(
			String verifierId,
			UpdateAdministratorDTO updateAdministratorDTO
	) {

		if (verifierId == null) {
			CustomUserDetails userDetails =
					(CustomUserDetails) SecurityContextHolder
							.getContext()
							.getAuthentication()
							.getPrincipal();

			verifierId = userDetails.getUserId();
		}

		Query userQuery = new Query(
				Criteria.where("_id").is(verifierId)
		);

		Update userUpdate = new Update();

		if (updateAdministratorDTO.getPassword() != null) {
			userUpdate.set(
					"password",
					passwordEncoder.encode(
							updateAdministratorDTO.getPassword()
					)
			);
		}

		if (!userUpdate.getUpdateObject().isEmpty()) {
			mongoTemplate.updateFirst(
					userQuery,
					userUpdate,
					User.class
			);
		}

		Query verifierQuery = new Query(
				Criteria.where("userId").is(verifierId)
		);

		Update verifierUpdate = new Update();

		if (updateAdministratorDTO.getFirstName() != null) {
			verifierUpdate.set(
					"firstName",
					updateAdministratorDTO.getFirstName()
			);
		}

		if (updateAdministratorDTO.getLastName() != null) {
			verifierUpdate.set(
					"lastName",
					updateAdministratorDTO.getLastName()
			);
		}

		if (updateAdministratorDTO.getPhoneNumber() != null) {
			verifierUpdate.set(
					"phoneNumber",
					updateAdministratorDTO.getPhoneNumber()
			);
		}

		if (!verifierUpdate.getUpdateObject().isEmpty()) {
			mongoTemplate.updateFirst(
					verifierQuery,
					verifierUpdate,
					Verifier.class
			);
		}

		return Map.of(
				"Message",
				"Successfully updated the verifier."
		);
	}
}