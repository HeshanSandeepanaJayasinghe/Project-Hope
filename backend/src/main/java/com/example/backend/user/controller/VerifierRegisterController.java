package com.example.backend.user.controller;

import com.example.backend.user.dto.RegisterVerifierDTO;
import com.example.backend.user.service.VerifierRegisterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class VerifierRegisterController {

	private final VerifierRegisterService verifierRegisterService;

	public VerifierRegisterController(VerifierRegisterService verifierRegisterService) {
		this.verifierRegisterService = verifierRegisterService;
	}

	@PostMapping("/register/verifier")
	public ResponseEntity<Map<String, String>> registerVerifier(
			@Valid @RequestBody RegisterVerifierDTO registerVerifierDTO
	) {
		return ResponseEntity.ok(verifierRegisterService.registerFinanceManager(registerVerifierDTO));
	}
}
