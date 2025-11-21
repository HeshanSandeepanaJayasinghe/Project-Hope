package com.example.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

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

private boolean agreedToTerms;

public Fundraiser() {}

// ---------- Getters and Setters ----------

public String getId() {
	return id;
}

public void setId(String id) {
	this.id = id;
}

public String getUserId() {
	return userId;
}

public void setUserId(String userId) {
	this.userId = userId;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public String getNic() {
	return nic;
}

public void setNic(String nic) {
	this.nic = nic;
}

public LocalDate getBirthday() {
	return birthday;
}

public void setBirthday(LocalDate birthday) {
	this.birthday = birthday;
}

public String getTelephone() {
	return telephone;
}

public void setTelephone(String telephone) {
	this.telephone = telephone;
}

public String getAddress() {
	return address;
}

public void setAddress(String address) {
	this.address = address;
}

public String getPostalCode() {
	return postalCode;
}

public void setPostalCode(String postalCode) {
	this.postalCode = postalCode;
}

public boolean isAgreedToTerms() {
	return agreedToTerms;
}

public void setAgreedToTerms(boolean agreedToTerms) {
	this.agreedToTerms = agreedToTerms;
}
}
