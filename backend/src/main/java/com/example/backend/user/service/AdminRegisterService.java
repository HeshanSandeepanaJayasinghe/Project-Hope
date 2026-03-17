package com.example.backend.user.service;

import com.example.backend.user.dto.RegisterAdminDTO;
import com.example.backend.user.model.Admin;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.AdminRepository;
import com.example.backend.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AdminRegisterService {

	private final PasswordEncoder passwordEncoder;
	private final AdminRepository adminRepository;
	private final UserRepository userRepository;

	public AdminRegisterService(
			PasswordEncoder passwordEncoder,
			AdminRepository adminRepository,
			UserRepository userRepository
	) {
		this.passwordEncoder = passwordEncoder;
		this.adminRepository = adminRepository;
		this.userRepository = userRepository;
	}

	public Map<String, String> registerAdmin(RegisterAdminDTO registerAdminDTO) {
		User user = new User();
		user.setEmail(registerAdminDTO.getEmail());
		user.setPassword(passwordEncoder.encode(registerAdminDTO.getPassword()));
		user.setRoles(List.of(User.Role.ADMIN));
		userRepository.save(user);

		Admin admin = new Admin();
		admin.setUserId(user.getUserId());
		admin.setFirstName(registerAdminDTO.getFirstName());
		admin.setLastName(registerAdminDTO.getLastName());
		admin.setPhoneNumber(registerAdminDTO.getPhoneNumber());
		adminRepository.save(admin);

		return Map.of("Message", "Successfully registered the admin.");
	}
}
