package com.example.backend.user.service;

import com.example.backend.user.dto.RegisterFinanceManagerDTO;
import com.example.backend.user.model.FinanceManager;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.FinanceManagerRepository;
import com.example.backend.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FinanceManagerRegisterService {

	private final PasswordEncoder passwordEncoder;
	private final FinanceManagerRepository financeManagerRepository;
	private final UserRepository userRepository;

	public FinanceManagerRegisterService(
			PasswordEncoder passwordEncoder,
			FinanceManagerRepository financeManagerRepository,
			UserRepository userRepository
	) {
		this.passwordEncoder = passwordEncoder;
		this.financeManagerRepository = financeManagerRepository;
		this.userRepository = userRepository;
	}

	public Map<String, String> registerFinanceManager(RegisterFinanceManagerDTO registerFinanceManagerDTO) {
		User user = new User();
		user.setEmail(registerFinanceManagerDTO.getEmail());
		user.setPassword(passwordEncoder.encode(registerFinanceManagerDTO.getPassword()));
		user.setRoles(List.of(User.Role.FINANCE_MANAGER));
		userRepository.save(user);

		FinanceManager financeManager = new FinanceManager();
		financeManager.setUserId(user.getUserId());
		financeManager.setFirstName(registerFinanceManagerDTO.getFirstName());
		financeManager.setLastName(registerFinanceManagerDTO.getLastName());
		financeManager.setPhoneNumber(registerFinanceManagerDTO.getPhoneNumber());
		financeManagerRepository.save(financeManager);

		return Map.of("Message", "Successfully registered the finance manager.");
	}

}
