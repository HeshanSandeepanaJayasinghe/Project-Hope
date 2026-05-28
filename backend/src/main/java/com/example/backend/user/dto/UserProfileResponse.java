package com.example.backend.user.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import com.example.backend.user.model.User;

@Data
@Builder
public class UserProfileResponse {
    private String userId;
    private String email;
    private List<User.Role> roles;
    private Object roleSpecificData;

    // For Admin, Superadmin, Verifier, FinanceManager
    @Builder.Default private String id = null;
    @Builder.Default private String firstName = null;
    @Builder.Default private String lastName = null;
    @Builder.Default private String phoneNumber = null;

    // For Donor
    @Builder.Default private String name = null;
    @Builder.Default private String nic = null;
    @Builder.Default private String occupation = null;
    @Builder.Default private String organization = null;
}