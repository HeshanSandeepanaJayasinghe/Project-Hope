package com.example.backend.user.service;

import com.example.backend.user.dto.FetchRecipientDTO;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class VerifierGetAllRecipientsService {

	@Autowired
	private MongoTemplate mongoTemplate;

	public List<FetchRecipientDTO> getAllRecipientsWithDetails() {
		Aggregation aggregation = Aggregation.newAggregation(
				addFields()
						.addField("userObjectId")
						.withValue(Document.parse("{ $toObjectId: '$userId' }"))
						.build(),

				addFields()
						.addField("actualRecipientId")
						.withValue(Document.parse("{ $ifNull: ['$recipientId', { $toString: '$_id' }] }"))
						.build(),

				lookup().from("user")
						.localField("userObjectId")
						.foreignField("_id")
						.as("userInfo"),

				lookup().from("verifications")
						.localField("actualRecipientId")
						.foreignField("recipientId")
						.as("verificationInfo"),

				unwind("userInfo", true),
				unwind("verificationInfo", true),

				addFields()
						.addField("extractedFilename")
						.withValue(
								Document.parse("{ $cond: { if: { $eq: ['$verificationInfo.documentUrl', null] }, then: null, else: { $arrayElemAt: [{ $split: ['$verificationInfo.documentUrl', '/'] }, -1] } } }")
						)
						.build(),

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
						.and("verificationSubmitted").as("verificationSubmitted")
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
						.and("extractedFilename").as("documentUrl")
						.and("verificationInfo.verifiedBy").as("verifiedBy")
		);

		return mongoTemplate.aggregate(aggregation, "recipient",
				FetchRecipientDTO.class).getMappedResults();
	}

	public FetchRecipientDTO getRecipientByUserId(String userId) {
		ObjectId userObjectId;
		try {
			userObjectId = new ObjectId(userId);
		} catch (Exception e) {
			return null;
		}

		Aggregation aggregation = Aggregation.newAggregation(
				match(Criteria.where("userId").is(userId)),

				addFields()
						.addField("userObjectId")
						.withValue(Document.parse("{ $toObjectId: '$userId' }"))
						.build(),

				addFields()
						.addField("actualRecipientId")
						.withValue(Document.parse("{ $ifNull: ['$recipientId', { $toString: '$_id' }] }"))
						.build(),

				lookup().from("user")
						.localField("userObjectId")
						.foreignField("_id")
						.as("userInfo"),

				lookup().from("verifications")
						.localField("actualRecipientId")
						.foreignField("recipientId")
						.as("verificationInfo"),

				unwind("userInfo", true),
				unwind("verificationInfo", true),

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
						.and("verificationSubmitted").as("verificationSubmitted")
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
						.and("verificationInfo.documentUrl").as("documentUrl")
						.and("verificationInfo.verifiedBy").as("verifiedBy")
		);

		FetchRecipientDTO result = mongoTemplate.aggregate(aggregation, "recipient",
				FetchRecipientDTO.class).getUniqueMappedResult();

		if (result != null && result.getDocumentUrl() != null) {
			String documentUrl = result.getDocumentUrl();
			String filename = documentUrl.substring(documentUrl.lastIndexOf('/') + 1);
			result.setDocumentUrl(filename);
		}

		return result;
	}
}