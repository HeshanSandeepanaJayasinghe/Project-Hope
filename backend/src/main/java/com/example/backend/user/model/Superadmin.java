package com.example.backend.user.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "superadmin")
@Data
public class Superadmin {

	@Id
	private String superadminId;
	private String userId;
	private String firstName;
	private String lastName;
	private String phoneNumber;

}
