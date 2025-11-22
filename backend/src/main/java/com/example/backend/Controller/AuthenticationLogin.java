package com.example.backend.Controller;


import com.example.backend.DTO.LoginDTO;
import com.example.backend.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationLogin {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO req){

		try{

			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(),req.getPassword()));
			String token = jwtUtil.generateKey(req.getEmail());
			return ResponseEntity.ok(Map.of("token", token));

		} catch (AuthenticationException e) {

			return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(Map.of("error", "Invalid credentials"));

		}



	}

}
