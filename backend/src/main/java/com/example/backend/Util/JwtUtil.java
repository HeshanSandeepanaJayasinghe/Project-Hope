package com.example.backend.Util;


import com.example.backend.Service.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Service
public class JwtUtil {

	private String secret = "mySuperSecretjafy1234567890123456";
	private Key key= Keys.hmacShaKeyFor(secret.getBytes());


	public String generateKey(String email){


		return	Jwts.builder()
				.subject(email)
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + 3600000))
				.signWith(key)
				.compact();

	}

	private Claims extractAllClaims(String token){

		return Jwts.parser()
			.verifyWith((SecretKey) key)
			.build()
			.parseSignedClaims(token)
			.getPayload();

	}

	public String extractEmail(String token) {

		return extractAllClaims(token).getSubject();

	}

	public boolean isValid(String token, CustomUserDetails user) {

		return extractEmail(token).equals(user.getUsername()) && !isExpired(token);

	}

	private boolean isExpired(String token){

		return extractAllClaims(token).getExpiration().before(new Date());

	}
}
