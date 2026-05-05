package com.example.backend.exceptions;

public class AlreadySubmittedVerificationException extends RuntimeException {
	public AlreadySubmittedVerificationException(String message) {
		super(message);
	}
}
