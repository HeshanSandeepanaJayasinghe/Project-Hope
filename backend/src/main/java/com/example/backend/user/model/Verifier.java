package com.example.backend.user.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "verifier")
public class Verifier {

	@Id
	private String verifierId;
	private String userId;
	private String firstName;
	private String lastName;
	private String phoneNumber;

}
