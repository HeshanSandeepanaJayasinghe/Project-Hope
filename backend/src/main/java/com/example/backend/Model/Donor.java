package com.example.backend.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "donor")
public class Donor {

@Id
private String id;

private String userId;

private String name;

private String occupation;

private String organization;

}
