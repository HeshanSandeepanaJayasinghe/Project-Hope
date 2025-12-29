package com.example.backend.Model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "post")
public class Post {

	@Id
	private ObjectId id;

	private ObjectId userId;
	private String title;
	private String description;
	private int target;
	private String imageUrl;
	private Priority priority;

	public enum Priority{
		HIGH,
		MEDIUM,
		LOW
	}


}
