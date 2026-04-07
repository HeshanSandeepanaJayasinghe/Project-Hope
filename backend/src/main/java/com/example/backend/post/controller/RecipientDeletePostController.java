package com.example.backend.post.controller;

import com.example.backend.post.service.RecipientDeletePostService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/recipient")
public class RecipientDeletePostController {

	private final RecipientDeletePostService recipientDeletePostService;

	public RecipientDeletePostController(RecipientDeletePostService recipientDeletePostService) {
		this.recipientDeletePostService = recipientDeletePostService;
	}

	@DeleteMapping("/delete/post/{postId}")
	public ResponseEntity<Map<String, String>> deletePost(@PathVariable String postId) {
		return ResponseEntity.ok(recipientDeletePostService.deletePost(postId));
	}
}
