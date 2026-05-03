package com.example.backend.user.controller;

import com.example.backend.user.dto.FetchRecipientDTO;
import com.example.backend.user.service.VerifierGetAllRecipientsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/verifier")
public class VerifierGetAllRecipientsController {

	private final VerifierGetAllRecipientsService verifierGetAllRecipientsService;

	public VerifierGetAllRecipientsController (VerifierGetAllRecipientsService verifierGetAllRecipientsService) {
		this.verifierGetAllRecipientsService = verifierGetAllRecipientsService;
	}

	@GetMapping("/get/all/recipients")
	public ResponseEntity<List<FetchRecipientDTO>> getAllRecipients() {
		return ResponseEntity.ok(verifierGetAllRecipientsService.getAllRecipientsWithDetails());
	}


}
