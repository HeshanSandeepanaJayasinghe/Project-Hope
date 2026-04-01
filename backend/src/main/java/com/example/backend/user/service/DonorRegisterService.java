package com.example.backend.user.service;

import com.example.backend.user.dto.RegisterDonorDTO;
import com.example.backend.user.model.Donor;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.DonorRepository;
import com.example.backend.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DonorRegisterService {

	private final PasswordEncoder passwordEncoder;
	private final DonorRepository donorRepository;
	private final UserRepository userRepository;

	public DonorRegisterService(
			PasswordEncoder passwordEncoder,
			DonorRepository donorRepository,
			UserRepository userRepository
	) {
		this.passwordEncoder = passwordEncoder;
		this.donorRepository = donorRepository;
		this.userRepository = userRepository;
	}

	public Map<String, String> registerDonor(RegisterDonorDTO registerDonorDTO) {


		User user = new User();
		user.setEmail(registerDonorDTO.getEmail());
		user.setPassword(passwordEncoder.encode(registerDonorDTO.getPassword()));
		user.setRoles(List.of(User.Role.DONOR));
		userRepository.save(user);

		Donor donor = new Donor();
		donor.setUserId(user.getUserId());
		donor.setName(registerDonorDTO.getName());
		donor.setNic(registerDonorDTO.getNic());
		donor.setOccupation(registerDonorDTO.getOccupation());
		donor.setOrganization(registerDonorDTO.getOrganization());
		donorRepository.save(donor);

		return Map.of("Message", "Successfully registered the donor.");
	}
}