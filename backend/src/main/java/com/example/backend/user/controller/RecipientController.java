package com.example.backend.user.controller;

import com.example.backend.user.dto.RecipientAdminViewDTO;
import com.example.backend.user.service.RecipientService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class RecipientController {

    private final RecipientService recipientService;

    public RecipientController(
            RecipientService recipientService
    ) {
        this.recipientService = recipientService;
    }

    @GetMapping("/get/all/recipients")
    public List<RecipientAdminViewDTO> getAllRecipients() {
        return recipientService.getAllRecipientsForAdmin();
    }
}