package com.example.backend.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection = "fundraiser")
public class Fundraiser {

@Id
private String id;

private String userId;

public String name;

private String nic;

private LocalDate birthday;

private String telephone;

private String address;

private String postalCode;

private Status status;

public enum Status{
	VERIFIED,
	NON_VERIFIED;
}

}
