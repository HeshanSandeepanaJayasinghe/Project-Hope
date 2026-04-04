package com.example.backend.user.controller;

import com.example.backend.user.dto.VerificationDTO;
import com.example.backend.user.service.AddVerificationDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/recipient")
public class AddVerificationDetailsController {

	private final AddVerificationDetailsService addVerificationDetailsService;

	public AddVerificationDetailsController(
			AddVerificationDetailsService addVerificationDetailsService
	) {
		this.addVerificationDetailsService = addVerificationDetailsService;
	}

	@PostMapping("/add/verification")
	public ResponseEntity<Map<String, String>> addVerificationDetails(
			@ModelAttribute VerificationDTO verificationDTO
	) {
		return ResponseEntity.ok(
				addVerificationDetailsService.addVerificationDetails(verificationDTO)
		);
	}
}
