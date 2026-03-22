package com.example.backend.user.controller;

import com.example.backend.user.dto.FetchAdministratorsDTO;
import com.example.backend.user.service.FetchFinanceManagersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/admin")
public class FetchFinanceManagersController {

	private final FetchFinanceManagersService fetchFinanceManagersService;

	public FetchFinanceManagersController(FetchFinanceManagersService fetchFinanceManagersService) {
		this.fetchFinanceManagersService = fetchFinanceManagersService;
	}

	@GetMapping("/get/finance-managers")
	public ResponseEntity<List<FetchAdministratorsDTO>> getFinanceManagerDetails() {
		return ResponseEntity.ok(fetchFinanceManagersService.getFinanceManagerDetails());
	}

}
