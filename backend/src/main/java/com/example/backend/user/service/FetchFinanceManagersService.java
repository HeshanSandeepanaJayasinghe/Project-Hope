package com.example.backend.user.service;

import com.example.backend.user.dto.FetchAdministratorsDTO;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FetchFinanceManagersService {

	private MongoTemplate mongoTemplate;

	public FetchFinanceManagersService(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
	}

	public List<FetchAdministratorsDTO> getFinanceManagerDetails() {
		AddFieldsOperation addFields = Aggregation.addFields()
				.addField("userIdObj")
				.withValue(ConvertOperators.ToObjectId.toObjectId("$userId"))
				.build();

		LookupOperation lookup = LookupOperation.newLookup()
				.from("user")
				.localField("userIdObj")
				.foreignField("_id")
				.as("userDetails");

		UnwindOperation unwind = Aggregation.unwind("userDetails");

		ProjectionOperation project = Aggregation.project("userId", "firstName", "lastName", "phoneNumber")
				.and("userDetails.email").as("email");

		Aggregation aggregation = Aggregation.newAggregation(
				addFields,
				lookup,
				unwind,
				project
		);

		AggregationResults<FetchAdministratorsDTO> results =
				mongoTemplate.aggregate(aggregation, "financeManager", FetchAdministratorsDTO.class);

		return results.getMappedResults();

	}


}
