package com.example.backend.user.service;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.user.dto.UpdateAdministratorDTO;
import com.example.backend.user.model.Admin;
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
public class UpdateAdminDetailsService {

	private final MongoTemplate mongoTemplate;
	private final PasswordEncoder passwordEncoder;

	public UpdateAdminDetailsService(
			MongoTemplate mongoTemplate,
			PasswordEncoder passwordEncoder
	) {
		this.mongoTemplate = mongoTemplate;
		this.passwordEncoder = passwordEncoder;
	}

	public Map<String, String> updateAdminDetails(
			String adminId,
			UpdateAdministratorDTO updateAdministratorDTO
	) {

		if (adminId == null) {
			CustomUserDetails userDetails =
					(CustomUserDetails) SecurityContextHolder
							.getContext()
							.getAuthentication()
							.getPrincipal();

			adminId = userDetails.getUserId();
		}

		Query userQuery = new Query(
				Criteria.where("_id").is(adminId)
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

		Query adminQuery = new Query(
				Criteria.where("userId").is(adminId)
		);

		Update adminUpdate = new Update();

		if (updateAdministratorDTO.getFirstName() != null) {
			adminUpdate.set(
					"firstName",
					updateAdministratorDTO.getFirstName()
			);
		}

		if (updateAdministratorDTO.getLastName() != null) {
			adminUpdate.set(
					"lastName",
					updateAdministratorDTO.getLastName()
			);
		}

		if (updateAdministratorDTO.getPhoneNumber() != null) {
			adminUpdate.set(
					"phoneNumber",
					updateAdministratorDTO.getPhoneNumber()
			);
		}

		if (!adminUpdate.getUpdateObject().isEmpty()) {
			mongoTemplate.updateFirst(
					adminQuery,
					adminUpdate,
					Admin.class
			);
		}

		return Map.of(
				"Message",
				"Successfully updated the admin."
		);
	}
}