package com.example.backend.user.service;

import com.example.backend.user.dto.DonorAdminViewDTO;
import com.example.backend.user.model.Donor;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.DonorRepository;
import com.example.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonorService {

    private final DonorRepository donorRepository;
    private final UserRepository userRepository;

    public DonorService(
            DonorRepository donorRepository,
            UserRepository userRepository
    ) {
        this.donorRepository = donorRepository;
        this.userRepository = userRepository;
    }

    public List<DonorAdminViewDTO> getAllDonorsForAdmin() {

        List<Donor> donors = donorRepository.findAll();

        return donors.stream()
                .map(donor -> {

                    User user = userRepository
                            .findById(donor.getUserId())
                            .orElse(null);

                    return new DonorAdminViewDTO(
                            donor.getUserId(),
                            donor.getName(),
                            user != null ? user.getEmail() : null
                    );
                })
                .collect(Collectors.toList());
    }
}