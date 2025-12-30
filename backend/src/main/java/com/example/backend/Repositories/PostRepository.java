package com.example.backend.Repositories;

import com.example.backend.Model.Post;
import com.example.backend.Repositories.Projections.PostDetails;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post,String> {
	long countByUserId(ObjectId userId);

	List<PostDetails> findPostDetailsForAdminsBy();

}
