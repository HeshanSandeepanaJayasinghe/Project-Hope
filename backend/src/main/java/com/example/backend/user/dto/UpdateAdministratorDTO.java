package com.example.backend.user.dto;

import lombok.Data;

@Data
public class UpdateAdministratorDTO {

	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private String phoneNumber;

}
