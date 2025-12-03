package com.example.backend.DTO.Trnasfers;

import com.example.backend.DTO.UserDetailsDTO;
import com.example.backend.Model.User;
import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class AdminUserDetails {

private final MongoTemplate mongoTemplate;

public AdminUserDetails(MongoTemplate mongoTemplate){
	this.mongoTemplate=mongoTemplate;
}

public List<UserDetailsDTO> getUserDetails(){


	LookupOperation lookup=LookupOperation.newLookup()
		.from("fundraiser")
		.localField("_id")
		.foreignField("userId")
		.as("fundraiserDetails");


	UnwindOperation unwind= Aggregation.unwind("fundraiserDetails",true);

	MatchOperation match=Aggregation.match(
		Criteria.where("role").is(User.Role.FUNDRAISER.name())

	);

	ProjectionOperation projection=Aggregation.project()
		.and("_id").as("UserId")
		.and("email").as("email")
		.and("fundraiserDetails.name").as("name")
		.and("fundraiserDetails.status").as("status");

	Aggregation aggregation=Aggregation.newAggregation(
		match,
		lookup,
		unwind,
		projection
	);

	AggregationResults<UserDetailsDTO> results = mongoTemplate.aggregate(aggregation, "user", UserDetailsDTO.class);
	return results.getMappedResults();


}

}
