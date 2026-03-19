package com.example.backend.user.controller;

import com.example.backend.user.dto.FetchAdministratorsDTO;
import com.example.backend.user.service.FetchAdministratorsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/superadmin")
public class FetchAdministratorsController {

	private final FetchAdministratorsService fetchAdministratorsService;

	public FetchAdministratorsController(FetchAdministratorsService fetchAdministratorsService) {
		this.fetchAdministratorsService = fetchAdministratorsService;
	}

	@GetMapping("/get/admins")
	public ResponseEntity<List<FetchAdministratorsDTO>> getAdminDetails() {
		return ResponseEntity.ok(fetchAdministratorsService.getAdminDetails());
	}

	@GetMapping("/get/finance-managers")
	public ResponseEntity<List<FetchAdministratorsDTO>> getFinanceManagerDetails() {
		return ResponseEntity.ok(fetchAdministratorsService.getfinanceManagerDetails());
	}
}
