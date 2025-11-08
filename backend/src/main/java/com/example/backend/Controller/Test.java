package com.example.backend.Controller;


import com.example.backend.Model.User;
import com.example.backend.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Test {

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/get/all")
	public List<User> getall(){
		return userRepository.findAll();
	}

}
