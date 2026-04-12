package com.example.backend.user.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "donors")
@Data
public class Donor {

	@Id
	private String donorId;
	private String userId;
	private String name;
	private String nic;
	private String occupation;
	private String organization;

}