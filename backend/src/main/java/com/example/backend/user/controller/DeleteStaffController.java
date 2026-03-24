package com.example.backend.user.controller;

import com.example.backend.user.service.DeleteStaffService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class DeleteStaffController {

	private final DeleteStaffService deleteStaffService;

	public DeleteStaffController(DeleteStaffService deleteStaffService) {
		this.deleteStaffService = deleteStaffService;
	}

	@DeleteMapping("/delete/finance-manager/{id}")
	public ResponseEntity<Map<String, String>> deleteFinanceManager(@PathVariable("id") String id) {
		return ResponseEntity.ok(deleteStaffService.deleteStaff(id));
	}

	@DeleteMapping("/delete/verifier/{id}")
	public ResponseEntity<Map<String, String>> deleteVerifier(@PathVariable("id") String id) {
		return ResponseEntity.ok(deleteStaffService.deleteStaff(id));
	}
}
