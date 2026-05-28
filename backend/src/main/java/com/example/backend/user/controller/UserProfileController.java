package com.example.backend.user.controller;

import com.example.backend.user.dto.UserProfileResponse;
import com.example.backend.user.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/admin", "/superadmin", "/finance-manager", "/verifier", "/donor" })
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUserProfile() {
        UserProfileResponse profile = userProfileService.getCurrentUserProfile();
        return ResponseEntity.ok(profile);
    }
}