package com.example.backend.user.controller;

import com.example.backend.user.dto.RegisterDonorDTO;
import com.example.backend.user.service.DonorRegisterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("authenticate/")
public class RegisterDonorController {

	private final DonorRegisterService donorRegisterService;

	public RegisterDonorController(DonorRegisterService donorRegisterService) {
		this.donorRegisterService = donorRegisterService;
	}

	@PostMapping("/register/donor")
	public ResponseEntity<Map<String, String>> registerDonor(
			@Valid @RequestBody RegisterDonorDTO registerDonorDTO
	) {
		return ResponseEntity.ok(donorRegisterService.registerDonor(registerDonorDTO));
	}
}
