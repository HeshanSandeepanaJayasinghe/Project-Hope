package com.example.backend.user.service;

import com.example.backend.user.model.User;
import com.example.backend.user.repository.FinanceManagerRepository;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.user.repository.VerifierRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DeleteStaffService {

	private final UserRepository userRepository;
	private final FinanceManagerRepository financeManagerRepository;
	private final VerifierRepository verifierRepository;

	public DeleteStaffService(
			UserRepository userRepository,
			VerifierRepository verifierRepository,
			FinanceManagerRepository financeManagerRepository
	) {
		this.userRepository = userRepository;
		this.verifierRepository = verifierRepository;
		this.financeManagerRepository = financeManagerRepository;
	}

	public Map<String, String> deleteStaff(String userId) {

		User user = userRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("User not found!"));

		String role = user.getRoles().getFirst().name();

		if (role.equals("VERIFIER")) {
			verifierRepository.deleteByUserId(userId);
			return Map.of("Message","Successfully deleted the verifier.");

		} else if (role.equals("FINANCE_MANAGER")) {
			financeManagerRepository.deleteByUserId(userId);
			return Map.of("Message","Successfully deleted the finance manager.");

		} else {
			throw new RuntimeException("Cannot delete user with role: " + role);
		}
	}
}
