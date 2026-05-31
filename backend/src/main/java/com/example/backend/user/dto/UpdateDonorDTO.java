package com.example.backend.user.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateDonorDTO {

    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @Pattern(regexp = "^[0-9]{12}$|^[0-9]{9}[vV]$", message = "Invalid NIC format")
    private String nic;

    @Size(min = 2, max = 100, message = "Occupation must be between 2 and 100 characters")
    private String occupation;

    @Size(max = 200, message = "Organization name too long")
    private String organization;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

}