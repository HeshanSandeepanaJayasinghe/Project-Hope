package com.example.backend.user.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admin")
@Data
public class Admin {

	@Id
	private String adminId;
	private String userId;
	private String firstName;
	private String lastName;
	private String phoneNumber;

}
