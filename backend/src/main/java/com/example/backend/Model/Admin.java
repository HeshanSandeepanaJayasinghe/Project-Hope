package com.example.backend.Model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "admin")
public class Admin {

@Id
private ObjectId id;

private ObjectId userId;
private String fullName;
private String phoneNumber;


}
