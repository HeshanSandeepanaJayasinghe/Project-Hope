package com.example.backend.user.controller;

import com.example.backend.user.dto.UpdateDonorDTO;
import com.example.backend.user.service.UpdateDonorDetailsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/donor")
public class UpdateDonorDetailsController {

    private final UpdateDonorDetailsService updateDonorDetailsService;

    public UpdateDonorDetailsController(UpdateDonorDetailsService updateDonorDetailsService) {
        this.updateDonorDetailsService = updateDonorDetailsService;
    }

    @PatchMapping("/update/profile")
    public ResponseEntity<Map<String, String>> updateOwnProfile(
           @Valid @RequestBody UpdateDonorDTO updateDonorDTO) {
        return ResponseEntity.ok(updateDonorDetailsService.updateDonorDetails(null, updateDonorDTO));
    }
}