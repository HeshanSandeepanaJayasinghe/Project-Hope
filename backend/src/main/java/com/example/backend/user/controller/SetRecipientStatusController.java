package com.example.backend.user.controller;

import com.example.backend.user.dto.EditRecipientStatusDTO;
import com.example.backend.user.service.SetRecipientStatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/verifier")
public class SetRecipientStatusController {

	private final SetRecipientStatusService setRecipientStatusService;

	public SetRecipientStatusController(SetRecipientStatusService setRecipientStatusService) {
		this.setRecipientStatusService = setRecipientStatusService;
	}

	@PatchMapping("/edit/recipient")
	public ResponseEntity<Map<String, String>> editRecipientStatus(
			@RequestBody EditRecipientStatusDTO editRecipientStatusDTO) {
		return ResponseEntity.ok(setRecipientStatusService.setRecipientStatus(editRecipientStatusDTO));
	}
}
