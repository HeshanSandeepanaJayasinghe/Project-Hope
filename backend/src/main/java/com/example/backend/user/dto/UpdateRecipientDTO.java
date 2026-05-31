package com.example.backend.user.dto;

import lombok.Data;

@Data
public class UpdateRecipientDTO {

    private String name;
    private String nic;
    private String birthday;
    private String address;
    private String postalCode;
    private String accountNo;
    private String phoneNumber;
    private String password;


}
