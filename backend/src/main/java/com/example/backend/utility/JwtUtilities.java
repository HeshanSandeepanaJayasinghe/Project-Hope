package com.example.backend.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtilities {

	@Value("${jwt.secret.key}")
	private String secretKey;
	private Key key;

	@PostConstruct
	public void init() {
		key = Keys.hmacShaKeyFor(secretKey.getBytes());
	}

	public String generateToken(String email) {
		return  Jwts.builder()
					.subject(email)
					.issuedAt(new Date())
					.expiration(new Date(System.currentTimeMillis()+1000 * 60 * 60 * 24))
					.signWith(key)
					.compact();
	}

	private Claims extractClaims(String token) {
		return (Claims) Jwts.parser()
				.verifyWith((SecretKey) key)
				.build()
				.parse(token)
				.getPayload();
	}

	private boolean isTokenNotExpired(String token) {
		return !extractClaims(token).getExpiration().before(new Date());
	}

	public boolean isTokenValid(String token, UserDetails userDetails){
		String username = extractClaims(token).getSubject();
		return (userDetails.getUsername().equals(username) && isTokenNotExpired(token));
	}

	public String extractUsername(String token){
		return extractClaims(token).getSubject();
	}


}
