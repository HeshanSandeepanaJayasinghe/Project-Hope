package com.example.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecipientAdminViewDTO {

    private String userId;
    private String name;
    private String email;
    private String phoneNumber;
}