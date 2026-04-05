package com.example.backend.post.controller;

import com.example.backend.post.model.Post;
import com.example.backend.post.service.GetAllPostsService;
import com.example.backend.post.service.GetPostImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/open")
public class GetAllPostsController {

	private final GetAllPostsService getAllPostsService;

	public GetAllPostsController(GetAllPostsService getAllPostsService) {
		this.getAllPostsService = getAllPostsService;
	}

	@GetMapping("/get/all/posts")
	public ResponseEntity<List<Post>> getAllPosts() {
		return ResponseEntity.ok(getAllPostsService.getAllPosts());
	}
}
