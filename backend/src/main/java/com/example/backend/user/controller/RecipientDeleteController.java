package com.example.backend.user.controller;

import com.example.backend.user.service.RecipientDeleteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("verifier/")
public class RecipientDeleteController {

	@Autowired
	private RecipientDeleteService deleteService;

	@DeleteMapping("/delete/recipient/{userId}")
	public ResponseEntity<Map<String, String>> deleteRecipientByUserId(@PathVariable String userId) {
		boolean deleted = deleteService.deleteRecipientCompletely(userId);

		Map<String, String> response = new HashMap<>();
		if (deleted) {
			response.put("message", "Recipient and all associated data deleted successfully");
			response.put("userId", userId);
			return ResponseEntity.ok(response);
		} else {
			response.put("message", "Recipient not found with userId: " + userId);
			return ResponseEntity.notFound().build();
		}
	}

}