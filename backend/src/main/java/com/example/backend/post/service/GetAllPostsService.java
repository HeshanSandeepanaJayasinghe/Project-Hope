package com.example.backend.post.service;

import com.example.backend.post.dto.PostResponseDTO;
import com.example.backend.post.model.Post;
import com.example.backend.post.repository.PostRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetAllPostsService {

	private PostRepository postRepository;

	public GetAllPostsService(PostRepository postRepository) {
		this.postRepository = postRepository;
	}

	public List<Post> getAllPosts() {
		return postRepository.findAll();
	}


}
