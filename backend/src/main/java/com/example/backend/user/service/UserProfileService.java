package com.example.backend.user.service;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.user.dto.UserProfileResponse;
import com.example.backend.user.model.*;
import com.example.backend.user.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final DonorRepository donorRepository;
    private final AdminRepository adminRepository;
    private final SuperadminRepository superadminRepository;
    private final VerifierRepository verifierRepository;
    private final FinanceManagerRepository financeManagerRepository;
    private final RecipientRepository recipientRepository;
    private final UserRepository userRepository;

    public UserProfileResponse getCurrentUserProfile() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        String userId = userDetails.getUserId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User.Role role = user.getRoles().get(0);

        return switch (role) {
            case SUPERADMIN -> getSuperadminProfile(userId, user);
            case ADMIN -> getAdminProfile(userId, user);
            case FINANCE_MANAGER -> getFinanceManagerProfile(userId, user);
            case VERIFIER -> getVerifierProfile(userId, user);
            case DONOR -> getDonorProfile(userId, user);
            case RECIPIENT -> getRecipientProfile(userId, user);
        };
    }

    private UserProfileResponse getSuperadminProfile(String userId, User user) {
        Superadmin superadmin = superadminRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Superadmin profile not found"));

        return UserProfileResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .roles(user.getRoles())
                .id(superadmin.getSuperadminId())
                .firstName(superadmin.getFirstName())
                .lastName(superadmin.getLastName())
                .phoneNumber(superadmin.getPhoneNumber())
                .roleSpecificData(superadmin)
                .build();
    }

    private UserProfileResponse getAdminProfile(String userId, User user) {
        Admin admin = adminRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Admin profile not found"));

        return UserProfileResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .roles(user.getRoles())
                .id(admin.getAdminId())
                .firstName(admin.getFirstName())
                .lastName(admin.getLastName())
                .phoneNumber(admin.getPhoneNumber())
                .roleSpecificData(admin)
                .build();
    }

    private UserProfileResponse getFinanceManagerProfile(String userId, User user) {
        FinanceManager financeManager = financeManagerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Finance Manager profile not found"));

        return UserProfileResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .roles(user.getRoles())
                .id(financeManager.getFinanceManagerId())
                .firstName(financeManager.getFirstName())
                .lastName(financeManager.getLastName())
                .phoneNumber(financeManager.getPhoneNumber())
                .roleSpecificData(financeManager)
                .build();
    }

    private UserProfileResponse getVerifierProfile(String userId, User user) {
        Verifier verifier = verifierRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Verifier profile not found"));

        return UserProfileResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .roles(user.getRoles())
                .id(verifier.getVerifierId())
                .firstName(verifier.getFirstName())
                .lastName(verifier.getLastName())
                .phoneNumber(verifier.getPhoneNumber())
                .roleSpecificData(verifier)
                .build();
    }

    private UserProfileResponse getDonorProfile(String userId, User user) {
        Donor donor = donorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Donor profile not found"));

        return UserProfileResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .roles(user.getRoles())
                .id(donor.getDonorId())
                .name(donor.getName())
                .nic(donor.getNic())
                .occupation(donor.getOccupation())
                .organization(donor.getOrganization())
                .roleSpecificData(donor)
                .build();
    }

    private UserProfileResponse getRecipientProfile(String userId, User user) {
        Recipient recipient = recipientRepository.findByUserId(userId);

        if (recipient == null) {
            throw new RuntimeException("Recipient profile not found");
        }

        return UserProfileResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .roles(user.getRoles())
                .id(recipient.getRecipientId())
                .name(recipient.getName())
                .nic(recipient.getNic())
                .phoneNumber(recipient.getPhoneNumber())
                .roleSpecificData(recipient)
                .build();
    }
}