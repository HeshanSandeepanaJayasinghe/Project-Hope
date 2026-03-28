package com.example.backend.user.controller;

import com.example.backend.user.dto.FetchAdministratorsDTO;
import com.example.backend.user.service.FetchAdminsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/superadmin")
public class FetchAdminsController {

	private final FetchAdminsService fetchAdminsService;

	public FetchAdminsController(FetchAdminsService fetchAdminsService) {
		this.fetchAdminsService = fetchAdminsService;
	}

	@GetMapping("/get/admins")
	public ResponseEntity<List<FetchAdministratorsDTO>> getAdminDetails() {
		return ResponseEntity.ok(fetchAdminsService.getAdminDetails());
	}

}
