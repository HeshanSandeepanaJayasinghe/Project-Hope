package com.example.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.security.auth.login.CredentialException;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptions {

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<Map<String, String>> handleInvalidCredentials(BadCredentialsException exception) {
		return ResponseEntity
					.status(HttpStatus.UNAUTHORIZED)
					.body(Map.of("Message", exception.getMessage()));
	}

	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<Map<String, String>> handleUserNameNotFound(UsernameNotFoundException exception) {
		return ResponseEntity
					.status(HttpStatus.NOT_FOUND)
					.body(Map.of("Message", exception.getMessage()));
	}
}
