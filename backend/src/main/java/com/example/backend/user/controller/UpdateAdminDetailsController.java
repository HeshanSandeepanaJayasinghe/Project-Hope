package com.example.backend.user.controller;

import com.example.backend.user.dto.UpdateAdministratorDTO;
import com.example.backend.user.service.UpdateAdminDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class UpdateAdminDetailsController {

	private final UpdateAdminDetailsService updateAdminDetailsService;

	public UpdateAdminDetailsController(UpdateAdminDetailsService updateAdminDetailsService) {
		this.updateAdminDetailsService = updateAdminDetailsService;
	}

	@PatchMapping("/update/profile")
	public ResponseEntity<Map<String, String>> updateOwnProfile(
			@RequestBody UpdateAdministratorDTO updateAdministratorDTO) {
		return ResponseEntity.ok(updateAdminDetailsService.updateAdminDetails(null, updateAdministratorDTO));
	}
}
