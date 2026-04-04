package com.example.backend.user.controller;

import com.example.backend.user.model.Superadmin;
import com.example.backend.user.repository.SuperadminRepository;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("register/")
public class SuperadminRegisterController {

	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private SuperadminRepository superadminRepository;
	@Autowired
	private UserRepository userRepository;

	@PostMapping("superadmin/{email}/{password}/{firstName}/{lastName}/{phoneNumber}")
	public String registerSuperadmin(@PathVariable String email, @PathVariable String password,
									 @PathVariable String firstName,
									 @PathVariable String lastName,
									 @PathVariable String phoneNumber



	) {
		User user = new User();
		user.setEmail(email);
		user.setPassword(passwordEncoder.encode(password));
		user.setRoles(List.of(User.Role.SUPERADMIN));
		userRepository.save(user);

		Superadmin superadmin = new Superadmin();
		superadmin.setFirstName(firstName);
		superadmin.setLastName(lastName);
		superadmin.setPhoneNumber(phoneNumber);
		superadmin.setUserId(user.getUserId());
		superadminRepository.save(superadmin);

		return "saved";

	}




}

