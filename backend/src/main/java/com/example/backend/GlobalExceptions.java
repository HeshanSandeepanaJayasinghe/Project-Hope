package com.example.backend;

import com.example.backend.exceptions.AlreadySubmittedVerificationException;
import com.example.backend.exceptions.EmailAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.security.auth.login.CredentialException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptions {



	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidationErrors(
			MethodArgumentNotValidException ex) {

		Map<String, String> errors = new HashMap<>();

		ex.getBindingResult()
				.getFieldErrors()
				.forEach(error ->
						errors.put(
								error.getField(),
								error.getDefaultMessage()
						));

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(errors);
	}

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

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException exception) {
		return ResponseEntity
				.status(HttpStatus.FORBIDDEN)
				.body(Map.of("Message", exception.getMessage()));
	}

	@ExceptionHandler(EmailAlreadyExistsException.class)
	public ResponseEntity<Map<String, String>> handleEmailExists(EmailAlreadyExistsException exception) {
		return ResponseEntity
				.status(HttpStatus.CONFLICT)
				.body(Map.of("Message", exception.getMessage()));
	}

	@ExceptionHandler(AlreadySubmittedVerificationException.class)
	public ResponseEntity<Map<String, String>> alreadySubmittedVerification(AlreadySubmittedVerificationException exception) {
		return ResponseEntity
				.status(HttpStatus.CONFLICT)
				.body(Map.of("Message", exception.getMessage()));
	}



}
