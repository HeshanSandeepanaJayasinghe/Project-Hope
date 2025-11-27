package com.example.backend.Model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "user")
public class User {

	@Id
	private String id;

	private String email;
	private String password;
	private Role role;

	public enum Role {
		ADMIN,
		FUNDRAISER,
		DONOR
	}

}
