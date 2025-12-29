package com.example.backend.DTO;


import com.example.backend.Model.Post;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NewPostDTO {

	private String title;
	private String description;
	private int target;
	private MultipartFile image;

}
