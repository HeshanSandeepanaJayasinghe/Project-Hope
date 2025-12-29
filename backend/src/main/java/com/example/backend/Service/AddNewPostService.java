package com.example.backend.Service;

import com.example.backend.DTO.NewPostDTO;
import com.example.backend.Exceptions.TooManyPostsException;
import com.example.backend.Model.Post;
import com.example.backend.Repositories.PostRepository;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;


@Service
public class AddNewPostService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private ImageUploadService imageUploadService;


	public Map<String ,String> addNewPost(NewPostDTO newPostDTO, ObjectId useId) throws IOException {

		int count=(int) postRepository.countByUserId(useId);

		if(count==3){
			throw new TooManyPostsException("You cannot post more than 3 posts.");
		}

		Post post=new Post();
		post.setUserId(useId);
		post.setDescription(newPostDTO.getDescription());
		post.setTitle(newPostDTO.getTitle());
		post.setTarget(newPostDTO.getTarget());
		post.setImageUrl(imageUploadService.storeImage(newPostDTO.getImage()));
		postRepository.save(post);




		return Map.of("Message", "Successful");
	}


}
