package com.example.backend.user.controller;

import com.example.backend.user.dto.RegisterAdminDTO;
import com.example.backend.user.service.AdminRegisterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("superadmin/")
public class AdminRegisterController {

	private final AdminRegisterService adminRegisterService;

	public AdminRegisterController(AdminRegisterService adminRegisterService) {
		this.adminRegisterService = adminRegisterService;
	}

	@PostMapping("/register/admin")
	public ResponseEntity<Map<String, String>> registerAdmin(
			@Valid @RequestBody RegisterAdminDTO registerAdminDTO
	) {
		return ResponseEntity.ok(adminRegisterService.registerAdmin(registerAdminDTO));
	}
}
