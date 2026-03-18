package com.example.backend.user.controller;

import com.example.backend.user.service.DeleteAdministratorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/superadmin")
public class DeleteAdministratorController {

	private  DeleteAdministratorService deleteAdministratorService;

	public DeleteAdministratorController(DeleteAdministratorService deleteAdministratorService) {
		this.deleteAdministratorService = deleteAdministratorService;
	}

	@DeleteMapping("/delete/adminstrator/{id}")
	public ResponseEntity<Map<String, String>> deleteAdministrator(@PathVariable("id") String id) {
		return ResponseEntity.ok(deleteAdministratorService.deleteAdministrator(id));
	}


}
