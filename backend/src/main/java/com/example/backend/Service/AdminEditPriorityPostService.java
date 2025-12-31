package com.example.backend.Service;

import com.example.backend.Model.Post;
import com.example.backend.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AdminEditPriorityPostService {

	@Autowired
	private PostRepository postRepository;

	public Map<String,String> editPriorityStatus(String id,Map<String,String> map){

		Post post= postRepository.findById(id).orElseThrow(()->
			new RuntimeException("The id is not valid."));

		if(map.containsKey("priority")){
			post.setPriority(Post.Priority.valueOf(map.get("priority")));
		}

		postRepository.save(post);
		return Map.of("Message","Successfully updated the priority.");




	}









}
