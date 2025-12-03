package com.example.backend.Model;


import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class SuperAdmin {

@Id
private ObjectId id;
private ObjectId userId;
private String name;



}
