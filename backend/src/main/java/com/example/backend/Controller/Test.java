package com.example.backend.Controller;


import com.example.backend.Model.User;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Test {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtUtil jwtUtil;

	@GetMapping("/get/all")
	public List<User> getall(){
		return userRepository.findAll();
	}

	@PostMapping("/get/one")
	public String getKey(@RequestParam  String email){
		System.out.println("hi");
		return jwtUtil.generateKey(email);
	}



}
