package com.example.backend.user.controller;

import com.example.backend.user.service.DeleteAdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/superadmin")
public class DeleteAdminController {

	private final DeleteAdminService deleteAdminService;

	public DeleteAdminController( DeleteAdminService deleteAdminService) {
		this.deleteAdminService = deleteAdminService;
	}

	@DeleteMapping("/delete/admin/{id}")
	public ResponseEntity<Map<String, String>> deleteAdmin(@PathVariable("id") String id) {
		return ResponseEntity.ok(deleteAdminService.deleteAdmin(id));
	}
}
