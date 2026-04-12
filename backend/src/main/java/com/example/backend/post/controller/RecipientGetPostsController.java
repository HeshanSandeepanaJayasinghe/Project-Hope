package com.example.backend.post.controller;

import com.example.backend.post.model.Post;
import com.example.backend.post.service.RecipientGetPostsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recipient")
public class RecipientGetPostsController {

	private final RecipientGetPostsService recipientGetPostsService;

	public RecipientGetPostsController(RecipientGetPostsService recipientGetPostsService) {
		this.recipientGetPostsService = recipientGetPostsService;
	}

	@GetMapping("/get/posts")
	public ResponseEntity<List<Post>> getAllPosts() {
		return ResponseEntity.ok(recipientGetPostsService.getAllPosts());
	}
}
