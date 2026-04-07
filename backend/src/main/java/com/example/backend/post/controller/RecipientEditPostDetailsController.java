package com.example.backend.post.controller;

import com.example.backend.post.dto.EditPostDetailsDTO;
import com.example.backend.post.service.RecipientEditPostDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/recipient")
public class RecipientEditPostDetailsController {

	private final RecipientEditPostDetailsService recipientEditPostDetailsService;

	public RecipientEditPostDetailsController(RecipientEditPostDetailsService recipientEditPostDetailsService) {
		this.recipientEditPostDetailsService = recipientEditPostDetailsService;
	}

	@PatchMapping("/edit/post")
	public ResponseEntity<Map<String, String>> editPostDetails(
			@RequestBody EditPostDetailsDTO editPostDetailsDTO) {

		return ResponseEntity.ok(recipientEditPostDetailsService.editPostDetails(editPostDetailsDTO));
	}

}
