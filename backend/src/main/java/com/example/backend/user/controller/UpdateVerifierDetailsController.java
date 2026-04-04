package com.example.backend.user.controller;

import com.example.backend.user.dto.UpdateAdministratorDTO;
import com.example.backend.user.service.UpdateFinanceManagerDetailsService;
import com.example.backend.user.service.UpdateVerifierDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping({"/admin","/verifier"})
public class UpdateVerifierDetailsController {

	private final UpdateVerifierDetailsService updateVerifierDetailsService;

	public UpdateVerifierDetailsController(
			UpdateVerifierDetailsService updateVerifierDetailsService
	) {
		this.updateVerifierDetailsService = updateVerifierDetailsService;
	}

	@PatchMapping("/update/verifier/{verifierId}")
	public ResponseEntity<Map<String,String>> updateAdmin(
			@PathVariable String verifierId,
			@RequestBody UpdateAdministratorDTO updateAdministratorDTO
	) {
		return ResponseEntity.ok(
				updateVerifierDetailsService.updateVerifierDetails(verifierId, updateAdministratorDTO)
		);
	}

	@PatchMapping("/update/profile")
	public ResponseEntity<Map<String, String>> updateOwnProfile(
			@RequestBody UpdateAdministratorDTO updateAdministratorDTO) {
		return ResponseEntity.ok(
				updateVerifierDetailsService.updateVerifierDetails(null, updateAdministratorDTO));
	}
}
