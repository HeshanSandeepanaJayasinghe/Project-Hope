package com.example.backend.post.controller;

import com.example.backend.post.service.GetPostImageService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.*;

@RestController
@RequestMapping("/open")
public class GetPostImageController {

	private final GetPostImageService getPostImageService;

	public  GetPostImageController(GetPostImageService getPostImageService) {
		this.getPostImageService = getPostImageService;
	}

	@GetMapping("/get/image/{imageName:.+}")
	public ResponseEntity<Resource> getPostImage(@PathVariable String imageName) {
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType("image/png"))
				.body(getPostImageService.getPostImage(imageName));
	}



}
