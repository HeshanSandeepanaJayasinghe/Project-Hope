package com.example.backend.Service;

import com.example.backend.Repositories.PostRepository;
import com.example.backend.Repositories.Projections.PostDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetPostDetailsForAdminsService {


	@Autowired
	private PostRepository postRepository;

	public List<PostDetails> findPostDetailsForAdmins(){
		return postRepository.findPostDetailsForAdminsBy();
	}



}
