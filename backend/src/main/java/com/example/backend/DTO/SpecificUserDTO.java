package com.example.backend.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SpecificUserDTO {

private String id;
private String name;
private String postalCode;
private String email;
private String number;
private String nic;
private String status;
private LocalDate birthday;
private String address;
private String province;
private String district;
private String divisionalSecretarial;
private String gramaNiladhariDivision;
private String occupation;
private String employmentCategory;
private String annualSalary;
private String assetStatus;
private String numberOfFamilyMembers;
private String longTermHealthIssues;

}
