package com.example.backend.user.service;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.user.dto.UpdateAdministratorDTO;
import com.example.backend.user.model.Admin;
import com.example.backend.user.model.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;
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

	public Map<String, String> updateAdminDetails(String adminId, UpdateAdministratorDTO updateAdministratorDTO) {

		if (adminId == null) {
			CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			adminId = userDetails.getUserId();
		}

		Query query1 = new Query(Criteria.where("_id").is(adminId));
		Update update1 = new Update();

		if (updateAdministratorDTO.getEmail() != null) {
			update1.set("email", updateAdministratorDTO.getEmail());
		}

		if (updateAdministratorDTO.getPassword() != null) {
			update1.set("password", passwordEncoder.encode(updateAdministratorDTO.getPassword()));
		}

		mongoTemplate.updateFirst(query1, update1, User.class);

		Query query2 = new Query(Criteria.where("userId").is(adminId));
		Update update2 = new Update();

		if (updateAdministratorDTO.getFirstName() != null) {
			update2.set("firstName", updateAdministratorDTO.getFirstName());
		}

		if (updateAdministratorDTO.getLastName() != null) {
			update2.set("lastName", updateAdministratorDTO.getLastName());
		}

		if (updateAdministratorDTO.getPhoneNumber() != null) {
			update2.set("phoneNumber", updateAdministratorDTO.getPhoneNumber());
		}

		mongoTemplate.updateFirst(query2, update2, Admin.class);

		return Map.of("Message", "Successfully updated the admin.");

	}

}
