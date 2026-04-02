package com.example.backend.user.service;


import com.example.backend.user.dto.RegisterRecipientDTO;
import com.example.backend.user.model.Recipient;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.RecipientRepository;
import com.example.backend.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecipientRegisterService {

	private final PasswordEncoder passwordEncoder;
	private final RecipientRepository recipientRepository;
	private final UserRepository userRepository;

	public RecipientRegisterService(
			PasswordEncoder passwordEncoder,
			RecipientRepository recipientRepository,
			UserRepository userRepository
	) {
		this.passwordEncoder = passwordEncoder;
		this.recipientRepository = recipientRepository;
		this.userRepository = userRepository;
	}

	public Map<String, String> registerRecipient(RegisterRecipientDTO registerRecipientDTO) {

		User user = new User();
		user.setEmail(registerRecipientDTO.getEmail());
		user.setPassword(passwordEncoder.encode(registerRecipientDTO.getPassword()));
		user.setRoles(List.of(User.Role.RECIPIENT));
		userRepository.save(user);

		Recipient recipient = new Recipient();
		recipient.setUserId(user.getUserId());
		recipient.setName(registerRecipientDTO.getName());
		recipient.setNic(registerRecipientDTO.getNic());
		recipient.setBirthday(registerRecipientDTO.getBirthday());
		recipient.setAddress(registerRecipientDTO.getAddress());
		recipient.setPostalCode(registerRecipientDTO.getPostalCode());
		recipient.setAccountNo(registerRecipientDTO.getAccountNo());
		recipient.setVerificationStatus(Recipient.VerificationStatus.UNVERIFIED);
		recipientRepository.save(recipient);

		Map<String, String> response = new HashMap<>();
		response.put("Message", "Successfully registered the recipient. Please wait for verification.");
		return response;
	}
}