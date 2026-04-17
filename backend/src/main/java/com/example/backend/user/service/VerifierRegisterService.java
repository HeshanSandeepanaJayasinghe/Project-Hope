package com.example.backend.user.service;

import com.example.backend.user.dto.RegisterFinanceManagerDTO;
import com.example.backend.user.dto.RegisterVerifierDTO;
import com.example.backend.user.model.FinanceManager;
import com.example.backend.user.model.User;
import com.example.backend.user.model.Verifier;
import com.example.backend.user.repository.FinanceManagerRepository;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.user.repository.VerifierRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class VerifierRegisterService {

	private final PasswordEncoder passwordEncoder;
	private final VerifierRepository verifierRepository;
	private final UserRepository userRepository;

	public VerifierRegisterService(
			PasswordEncoder passwordEncoder,
			VerifierRepository verifierRepository,
			UserRepository userRepository
	) {
		this.passwordEncoder = passwordEncoder;
		this.verifierRepository = verifierRepository;
		this.userRepository = userRepository;
	}

	public Map<String, String> registerFinanceManager(RegisterVerifierDTO registerVerifierDTO) {

		if (userRepository.existsByEmail(registerVerifierDTO.getEmail())) {
			throw new RuntimeException("Email already exists");
		}

		User user = new User();
		user.setEmail(registerVerifierDTO.getEmail());
		user.setPassword(passwordEncoder.encode(registerVerifierDTO.getPassword()));
		user.setRoles(List.of(User.Role.VERIFIER));
		userRepository.save(user);

		Verifier verifier = new Verifier();
		verifier.setUserId(user.getUserId());
		verifier.setFirstName(registerVerifierDTO.getFirstName());
		verifier.setLastName(registerVerifierDTO.getLastName());
		verifier.setPhoneNumber(registerVerifierDTO.getPhoneNumber());
		verifierRepository.save(verifier);

		return Map.of("Message", "Successfully registered the verifier.");
	}

}
