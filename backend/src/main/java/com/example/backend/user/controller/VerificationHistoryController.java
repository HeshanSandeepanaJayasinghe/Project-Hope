package com.example.backend.user.controller;

import com.example.backend.user.dto.VerificationHistoryDTO;
import com.example.backend.user.service.VerificationHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/verifier","/admin"})
public class VerificationHistoryController {

	private final VerificationHistoryService verificationHistoryService;

	public VerificationHistoryController(VerificationHistoryService verificationHistoryService) {
		this.verificationHistoryService = verificationHistoryService;
	}

	@GetMapping("/history/all")
	@PreAuthorize("hasAnyAuthority('VERIFIER', 'ADMIN')")
	public ResponseEntity<List<VerificationHistoryDTO>> getAllVerificationHistory() {
		return ResponseEntity.ok(verificationHistoryService.getAllVerificationHistory());
	}
}
