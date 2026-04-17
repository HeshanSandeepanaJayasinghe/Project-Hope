package com.example.backend.user.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "user")
@Data
public class User {

	@Id
	private String userId;
	@Indexed(unique = true)	private String email;
	private String password;
	private List<Role> roles;

	public enum Role {
		SUPERADMIN,
		ADMIN,
		FINANCE_MANAGER,
		VERIFIER,
		DONOR,
		RECIPIENT
	}

}
