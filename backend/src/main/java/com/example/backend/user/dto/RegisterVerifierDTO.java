package com.example.backend.user.dto;

import lombok.Data;

@Data
public class RegisterVerifierDTO {

	private String email;
	private String password;
	private String phoneNumber;
	private String firstName;
	private String lastName;

}
