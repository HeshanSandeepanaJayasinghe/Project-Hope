package com.example.backend.DTO.Transfers;

import com.example.backend.DTO.SpecificUserDTO;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminViewOneUserDetails {

@Autowired
private MongoTemplate mongoTemplate;

public SpecificUserDTO getSpecificUser(ObjectId id) {

	MatchOperation match = Aggregation.match(
		Criteria.where("_id").is(id)
	);

	LookupOperation lookupOperation = LookupOperation.newLookup()
		.from("fundraiser")
		.localField("_id")
		.foreignField("userId")
		.as("fundraiserDetails");



	UnwindOperation unwindFundraiser = Aggregation.unwind("fundraiserDetails", true);

	LookupOperation lookupOperation1=LookupOperation.newLookup()
		.from("fundraiserVerification")
		.localField("fundraiserDetails.userId")
		.foreignField("user_id")
		.as("verificationDetails");

	ProjectionOperation projection=Aggregation.project()
		.and("_id").as("UserId")
		.and("email").as("email")
		.and("fundraiserDetails.name").as("name")
		.and("fundraiserDetails.nic").as("nic")
		.and("fundraiserDetails.birthday").as("birthday")
		.and("fundraiserDetails.telephone").as("number")
		.and("fundraiserDetails.address").as("address")
		.and("fundraiserDetails.postalCode").as("postalCode")
		.and("fundraiserDetails.status").as("status")
		.and("fundraiserDetails.status").as("status")
		.and("verificationDetails.province").as("province")
		.and("verificationDetails.district").as("district")
		.and("verificationDetails.divisionalSecretarial").as("divisionalSecretarial")
		.and("verificationDetails.gramaNiladhariDivision").as("gramaNiladhariDivision")
		.and("verificationDetails.occupation").as("occupation")
		.and("verificationDetails.employmentCategory").as("employmentCategory")
		.and("verificationDetails.annualSalary").as("annualSalary")
		.and("verificationDetails.assetStatus").as("assetStatus")
		.and("verificationDetails.numberOfFamilyMembers").as("numberOfFamilyMembers")
		.and("verificationDetails.longTermHealthIssues").as("longTermHealthIssues")


		;

	Aggregation aggregation = Aggregation.newAggregation(
		match,
		lookupOperation,
		unwindFundraiser,
		lookupOperation1,
		projection

	);


	AggregationResults<SpecificUserDTO> results =
		mongoTemplate.aggregate(aggregation, "user", SpecificUserDTO.class);
	List<SpecificUserDTO> users = results.getMappedResults();
	return  users.get(0);
}
}