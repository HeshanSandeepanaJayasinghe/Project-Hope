package com.example.backend.user.controller;

import com.example.backend.user.dto.FetchAdministratorsDTO;
import com.example.backend.user.service.FetchFinanceManagersService;
import com.example.backend.user.service.FetchVerifierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class FetchVerifierController {

	private final FetchVerifierService fetchVerifierService;

	public FetchVerifierController(FetchVerifierService fetchVerifierService) {
		this.fetchVerifierService = fetchVerifierService;
	}

	@GetMapping("/get/verifier")
	public ResponseEntity<List<FetchAdministratorsDTO>> getVerifierDetails() {
		return ResponseEntity.ok(fetchVerifierService.getVerifierDetails());
	}

}
