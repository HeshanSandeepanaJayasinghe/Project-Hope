package com.example.backend.authentication;

import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.utility.JwtUtilities;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class LoginService {

	private final UserRepository userRepository;
	private final JwtUtilities jwtUtilities;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;

	public LoginService(
			UserRepository userRepository,
			JwtUtilities jwtUtilities,
			PasswordEncoder passwordEncoder,
			AuthenticationManager authenticationManager
	) {
		this.userRepository = userRepository;
		this.jwtUtilities = jwtUtilities;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
	}

	public Map<String, String> login(LoginDTO loginDTO) {
		try {
			authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginDTO.getEmail(),
						loginDTO.getPassword()
				)
			);

			User user = userRepository.findByEmail(loginDTO.getEmail())
					.orElseThrow(()-> new UsernameNotFoundException("Incorrect email!"));

			return Map.of("Token", jwtUtilities.generateToken(loginDTO.getEmail()));

		} catch (BadCredentialsException exception) {
			throw new BadCredentialsException("Invalid login credentials!", exception);
		}
	}
}
