package com.example.backend.user.service;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.user.dto.UpdateAdministratorDTO;
import com.example.backend.user.model.FinanceManager;
import com.example.backend.user.model.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UpdateFinanceManagerDetailsService {

	private final MongoTemplate mongoTemplate;
	private final PasswordEncoder passwordEncoder;

	public UpdateFinanceManagerDetailsService(
			MongoTemplate mongoTemplate,
			PasswordEncoder passwordEncoder
	) {
		this.mongoTemplate = mongoTemplate;
		this.passwordEncoder = passwordEncoder;
	}

	public Map<String, String> updateFinanceManagerDetails(
			String financeManagerId,
			UpdateAdministratorDTO updateAdministratorDTO
	) {

		if (financeManagerId == null) {
			CustomUserDetails userDetails =
					(CustomUserDetails) SecurityContextHolder
							.getContext()
							.getAuthentication()
							.getPrincipal();

			financeManagerId = userDetails.getUserId();
		}

		Query userQuery = new Query(
				Criteria.where("_id").is(financeManagerId)
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

		Query financeManagerQuery = new Query(
				Criteria.where("userId")
						.is(financeManagerId)
		);

		Update financeManagerUpdate = new Update();

		if (updateAdministratorDTO.getFirstName() != null) {
			financeManagerUpdate.set(
					"firstName",
					updateAdministratorDTO.getFirstName()
			);
		}

		if (updateAdministratorDTO.getLastName() != null) {
			financeManagerUpdate.set(
					"lastName",
					updateAdministratorDTO.getLastName()
			);
		}

		if (updateAdministratorDTO.getPhoneNumber() != null) {
			financeManagerUpdate.set(
					"phoneNumber",
					updateAdministratorDTO.getPhoneNumber()
			);
		}

		if (!financeManagerUpdate.getUpdateObject().isEmpty()) {
			mongoTemplate.updateFirst(
					financeManagerQuery,
					financeManagerUpdate,
					FinanceManager.class
			);
		}

		return Map.of(
				"Message",
				"Successfully updated the finance manager."
		);
	}
}