package com.example.backend.post.controller;

import com.example.backend.post.dto.PostRequestDTO;
import com.example.backend.post.service.UploadPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/recipient")
public class UploadPostController {

	private final UploadPostService uploadPostService;

	public UploadPostController(UploadPostService uploadPostService) {
		this.uploadPostService = uploadPostService;
	}

	@PostMapping("/add/post")
	public ResponseEntity<Map<String, String>> uploadPost(@ModelAttribute PostRequestDTO postRequestDTO){

		return ResponseEntity.ok(uploadPostService.uploadPost(postRequestDTO));

	}
}
