package com.example.backend.user.controller;

import com.example.backend.user.dto.UpdateRecipientDTO;
import com.example.backend.user.service.UpdateRecipientDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/recipient")
public class UpdateRecipientDetailsController {

    private final UpdateRecipientDetailsService updateRecipientDetailsService;

    public UpdateRecipientDetailsController(UpdateRecipientDetailsService updateRecipientDetailsService) {
        this.updateRecipientDetailsService = updateRecipientDetailsService;
    }

    @PatchMapping("/update/profile")
    public ResponseEntity<Map<String, String>> updateOwnProfile(
            @RequestBody UpdateRecipientDTO updateRecipientDTO) {
        return ResponseEntity.ok(updateRecipientDetailsService.updateRecipientDetails(null, updateRecipientDTO));
    }
}