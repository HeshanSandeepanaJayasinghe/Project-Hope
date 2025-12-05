package com.example.backend.DTO;

import lombok.Data;
import org.bson.types.ObjectId;

@Data
public class  Admin_FinancialRegisterDTO{

private String password;
private String email;
private String fullName;
private String phoneNumber;


}