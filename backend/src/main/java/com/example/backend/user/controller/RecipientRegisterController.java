package com.example.backend.user.controller;

import com.example.backend.user.dto.RegisterRecipientDTO;
import com.example.backend.user.service.RecipientRegisterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("authenticate/")
@Validated
public class RecipientRegisterController {

	private final RecipientRegisterService recipientRegisterService;

	public RecipientRegisterController(RecipientRegisterService recipientRegisterService) {
		this.recipientRegisterService = recipientRegisterService;
	}

	@PostMapping("/register/recipient")
	public ResponseEntity<Map<String, String>> registerRecipient(
			@Valid @RequestBody RegisterRecipientDTO registerRecipientDTO
	) {

		return ResponseEntity.ok(recipientRegisterService.registerRecipient(registerRecipientDTO));
	}
}