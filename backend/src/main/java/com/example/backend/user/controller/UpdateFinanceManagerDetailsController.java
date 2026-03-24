package com.example.backend.user.controller;

import com.example.backend.user.dto.UpdateAdministratorDTO;
import com.example.backend.user.service.UpdateFinanceManagerDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping({"/admin","/finance-manager"})
public class UpdateFinanceManagerDetailsController {

	private final UpdateFinanceManagerDetailsService updateFinanceManagerDetailsService;

	public UpdateFinanceManagerDetailsController(
			UpdateFinanceManagerDetailsService updateFinanceManagerDetailsService
	) {
		this.updateFinanceManagerDetailsService = updateFinanceManagerDetailsService;
	}

	@PatchMapping("/update/finance-manager/{financeManagerId}")
	public ResponseEntity<Map<String,String>> updateAdmin(
			@PathVariable String financeManagerId,
			@RequestBody UpdateAdministratorDTO updateAdministratorDTO
	) {
		return ResponseEntity.ok(
				updateFinanceManagerDetailsService.updateFinanceManagerDetails(financeManagerId, updateAdministratorDTO)
		);
	}

	@PatchMapping("/update/profile")
	public ResponseEntity<Map<String, String>> updateOwnProfile(
			@RequestBody UpdateAdministratorDTO updateAdministratorDTO) {
		return ResponseEntity.ok(
				updateFinanceManagerDetailsService.updateFinanceManagerDetails(null, updateAdministratorDTO));
	}
}
