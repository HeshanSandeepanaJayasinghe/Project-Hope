package com.example.backend.user.service;

import com.example.backend.user.model.User;
import com.example.backend.user.repository.AdminRepository;
import com.example.backend.user.repository.FinanceManagerRepository;
import com.example.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DeleteAdministratorService {

	private final UserRepository userRepository;
	private final AdminRepository adminRepository;
	private final FinanceManagerRepository financeManagerRepository;

	public DeleteAdministratorService(
			UserRepository userRepository,
			AdminRepository adminRepository,
			FinanceManagerRepository financeManagerRepository
	) {
		this.userRepository = userRepository;
		this.adminRepository = adminRepository;
		this.financeManagerRepository = financeManagerRepository;
	}

	public Map<String, String> deleteAdministrator(String userId) {

		User user = userRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("User not found!"));

		String role = user.getRoles().getFirst().name();
		if (role.equals("FINANCE_MANAGER")) {
			financeManagerRepository.deleteByUserId(userId);
			return Map.of("Message","Successfully deleted the finance manager.");

		} else if (role.equals("ADMIN")) {
			adminRepository.deleteByUserId(userId);
			return Map.of("Message","Successfully deleted the admin.");

		} else {
			throw new RuntimeException("Cannot delete user with role: " + role);
		}
	}



}
