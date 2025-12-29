package com.example.backend.Controller;

import com.example.backend.DTO.NewPostDTO;
import com.example.backend.Service.AddNewPostService;
import com.example.backend.Service.CustomUserDetails;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/fundraiser")
public class AddNewPostController {

	@Autowired
	private AddNewPostService addNewPostService;

	@PostMapping("/post")
	public ResponseEntity<?> postNewAdd(@ModelAttribute NewPostDTO newPostDTO) throws IOException {

		CustomUserDetails customUserDetails= (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		ObjectId userId=customUserDetails.getUserId();

		return ResponseEntity.status(HttpStatus.CREATED).body(addNewPostService.addNewPost(newPostDTO, userId));


	}





}
