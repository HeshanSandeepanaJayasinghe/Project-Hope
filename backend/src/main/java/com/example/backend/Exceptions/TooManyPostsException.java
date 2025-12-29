package com.example.backend.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


public class TooManyPostsException extends RuntimeException {
	public TooManyPostsException(String message) { super(message); }
}