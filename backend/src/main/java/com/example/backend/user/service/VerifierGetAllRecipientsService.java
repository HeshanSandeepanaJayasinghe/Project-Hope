package com.example.backend.user.service;

import com.example.backend.user.dto.FetchRecipientDTO;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class VerifierGetAllRecipientsService {

	@Autowired
	private MongoTemplate mongoTemplate;

	public List<FetchRecipientDTO> getAllRecipientsWithDetails() {
		Aggregation aggregation = Aggregation.newAggregation(
				// Convert userId to ObjectId
				addFields()
						.addField("userObjectId")
						.withValue(Document.parse("{ $toObjectId: '$userId' }"))
						.build(),

				// Handle recipientId
				addFields()
						.addField("actualRecipientId")
						.withValue(Document.parse("{ $ifNull: ['$recipientId', { $toString: '$_id' }] }"))
						.build(),

				// Join with User
				lookup().from("user")
						.localField("userObjectId")
						.foreignField("_id")
						.as("userInfo"),

				// Join with Verifications
				lookup().from("verifications")
						.localField("actualRecipientId")
						.foreignField("recipientId")
						.as("verificationInfo"),

				unwind("userInfo", true),
				unwind("verificationInfo", true),

				// Transform the documentUrl to use new endpoint
				addFields()
						.addField("transformedDocumentUrl")
						.withValue(
								Document.parse("{ $cond: { if: { $eq: ['$verificationInfo.documentUrl', null] }, then: null, else: { $concat: ['http://localhost:8080/verifier/get/pdf/', { $arrayElemAt: [{ $split: ['$verificationInfo.documentUrl', '/get/document/'] }, 1] }] } } }")
						)
						.build(),

				// Project the fields
				project()
						.and("userInfo.email").as("email")
						.and("userInfo._id").as("userId")
						.and("actualRecipientId").as("recipientId")
						.and("name").as("name")
						.and("nic").as("nic")
						.and("birthday").as("birthday")
						.and("address").as("address")
						.and("postalCode").as("postalCode")
						.and("accountNo").as("accountNo")
						.and("phoneNUmber").as("phoneNumber")
						.and("postCount").as("postCount")
						.and("verificationStatus").as("verificationStatus")
						.and("verificationInfo.verificationId").as("verificationId")
						.and("verificationInfo.province").as("province")
						.and("verificationInfo.district").as("district")
						.and("verificationInfo.divisionalSecretarial").as("divisionalSecretarial")
						.and("verificationInfo.gramaNiladhariDivision").as("gramaNiladhariDivision")
						.and("verificationInfo.employmentCategory").as("employmentCategory")
						.and("verificationInfo.occupation").as("occupation")
						.and("verificationInfo.annualSalary").as("annualSalary")
						.and("verificationInfo.assetStatus").as("assetStatus")
						.and("verificationInfo.numberOfFamilyMembers").as("numberOfFamilyMembers")
						.and("verificationInfo.longTermHealthIssues").as("longTermHealthIssues")
						.and("transformedDocumentUrl").as("documentUrl")  // Use transformed URL
						.and("verificationInfo.verifiedBy").as("verifiedBy")
		);

		return mongoTemplate.aggregate(aggregation, "recipient",
				FetchRecipientDTO.class).getMappedResults();
	}
}