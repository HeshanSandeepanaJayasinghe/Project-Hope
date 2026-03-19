package com.example.backend.user.dto;

import lombok.Data;

@Data
public class FetchAdministratorsDTO {

	private String userId;
	private String email;
	private String firstName;
	private String lastName;
	private String phoneNumber;

}
