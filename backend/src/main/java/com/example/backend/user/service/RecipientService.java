package com.example.backend.user.service;

import com.example.backend.user.dto.RecipientAdminViewDTO;
import com.example.backend.user.model.Recipient;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.RecipientRepository;
import com.example.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipientService {

    private final RecipientRepository recipientRepository;
    private final UserRepository userRepository;

    public RecipientService(
            RecipientRepository recipientRepository,
            UserRepository userRepository
    ) {
        this.recipientRepository = recipientRepository;
        this.userRepository = userRepository;
    }

    public List<RecipientAdminViewDTO> getAllRecipientsForAdmin() {

        List<Recipient> recipients =
                recipientRepository.findAll();

        return recipients.stream()
                .map(recipient -> {

                    User user = userRepository
                            .findById(recipient.getUserId())
                            .orElse(null);

                    return new RecipientAdminViewDTO(
                            recipient.getUserId(),
                            recipient.getName(),
                            user != null ? user.getEmail() : null,
                            recipient.getPhoneNumber()
                    );
                })
                .collect(Collectors.toList());
    }
}