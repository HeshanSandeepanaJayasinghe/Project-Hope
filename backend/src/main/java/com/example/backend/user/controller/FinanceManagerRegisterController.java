package com.example.backend.user.controller;

import com.example.backend.user.dto.RegisterFinanceManagerDTO;
import com.example.backend.user.service.FinanceManagerRegisterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class FinanceManagerRegisterController {

	private final FinanceManagerRegisterService financeManagerRegisterService;

	public FinanceManagerRegisterController(FinanceManagerRegisterService financeManagerRegisterService) {
		this.financeManagerRegisterService = financeManagerRegisterService;
	}

	@PostMapping("/register/finance-manager")
	public ResponseEntity<Map<String, String>> registerAdmin(@RequestBody RegisterFinanceManagerDTO registerFinanceManagerDTO) {
		return ResponseEntity.ok(financeManagerRegisterService.registerFinanceManager(registerFinanceManagerDTO));
	}


}
