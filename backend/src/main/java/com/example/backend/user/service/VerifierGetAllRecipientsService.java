package com.example.backend.user.service;

import com.example.backend.user.dto.FetchRecipientDTO;
import org.bson.Document;
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
						.addField("recipientIdString")
						.withValue(Document.parse("{ $toString: '$_id' }"))
						.build(),


				lookup()
						.from("user")
						.localField("userObjectId")
						.foreignField("_id")
						.as("userInfo"),

				lookup()
						.from("verifications")
						.localField("recipientIdString")
						.foreignField("recipientId")
						.as("verificationInfo"),

				unwind("userInfo", true),
				unwind("verificationInfo", true),

				addFields()
						.addField("extractedFilename")
						.withValue(
								Document.parse("""
                            {
                              $cond: {
                                if: { $eq: ['$verificationInfo.documentUrl', null] },
                                then: null,
                                else: {
                                  $arrayElemAt: [
                                    { $split: ['$verificationInfo.documentUrl', '/'] },
                                    -1
                                  ]
                                }
                              }
                            }
                            """)
						)
						.build(),


				project()

						.and("userInfo.email").as("email")
						.and("userInfo._id").as("userId")


						.and("_id").as("recipientId")
						.and("name").as("name")
						.and("nic").as("nic")
						.and("birthday").as("birthday")
						.and("address").as("address")
						.and("postalCode").as("postalCode")
						.and("phoneNumber").as("phoneNumber")
						.and("postCount").as("postCount")
						.and("verificationStatus").as("verificationStatus")


						.and("verificationSubmitted").as("verificationSubmitted")

						.and("verificationInfo._id").as("verificationId")
						.and("verificationInfo.province").as("province")
						.and("verificationInfo.district").as("district")
						.and("verificationInfo.divisionalSecretarial").as("divisionalSecretarial")
						.and("verificationInfo.gramaNiladhariDivision").as("gramaNiladhariDivision")
						.and("verificationInfo.employmentCategory").as("employmentCategory")
						.and("verificationInfo.occupation").as("occupation")
						.and("verificationInfo.annualSalary").as("annualSalary")
						.and("verificationInfo.accountNo").as("accountNo")
						.and("verificationInfo.assetStatus").as("assetStatus")
						.and("verificationInfo.numberOfFamilyMembers").as("numberOfFamilyMembers")
						.and("verificationInfo.longTermHealthIssues").as("longTermHealthIssues")
						.and("verificationInfo.verifiedBy").as("verifiedBy")


						.and("extractedFilename").as("documentUrl")
		);

		return mongoTemplate.aggregate(
				aggregation,
				"recipient",
				FetchRecipientDTO.class
		).getMappedResults();
	}

	public FetchRecipientDTO getRecipientByUserId(String userId) {

		Aggregation aggregation = Aggregation.newAggregation(

				match(Criteria.where("userId").is(userId)),

				addFields()
						.addField("userObjectId")
						.withValue(Document.parse("{ $toObjectId: '$userId' }"))
						.build(),

				addFields()
						.addField("recipientIdString")
						.withValue(Document.parse("{ $toString: '$_id' }"))
						.build(),

				lookup()
						.from("user")
						.localField("userObjectId")
						.foreignField("_id")
						.as("userInfo"),

				lookup()
						.from("verifications")
						.localField("recipientIdString")
						.foreignField("recipientId")
						.as("verificationInfo"),

				unwind("userInfo", true),
				unwind("verificationInfo", true),

				addFields()
						.addField("extractedFilename")
						.withValue(
								Document.parse("""
                                {
                                  $cond: {
                                    if: { $eq: ['$verificationInfo.documentUrl', null] },
                                    then: null,
                                    else: {
                                      $arrayElemAt: [
                                        { $split: ['$verificationInfo.documentUrl', '/'] },
                                        -1
                                      ]
                                    }
                                  }
                                }
                                """)
						)
						.build(),

				addFields()
						.addField("verificationSubmitted")
						.withValue("$verificationSubmitted")
						.build(),

				project()
						.and("userInfo.email").as("email")
						.and("userInfo._id").as("userId")

						.and("_id").as("recipientId")
						.and("name").as("name")
						.and("nic").as("nic")
						.and("birthday").as("birthday")
						.and("address").as("address")
						.and("postalCode").as("postalCode")
						.and("phoneNumber").as("phoneNumber")
						.and("postCount").as("postCount")
						.and("verificationSubmitted").as("verificationSubmitted")
						.and("verificationStatus").as("verificationStatus")


						.and("verificationSubmitted").as("verificationSubmitted")

						.and("verificationInfo._id").as("verificationId")
						.and("verificationInfo.province").as("province")
						.and("verificationInfo.district").as("district")
						.and("verificationInfo.divisionalSecretarial").as("divisionalSecretarial")
						.and("verificationInfo.gramaNiladhariDivision").as("gramaNiladhariDivision")
						.and("verificationInfo.employmentCategory").as("employmentCategory")
						.and("verificationInfo.occupation").as("occupation")
						.and("verificationInfo.annualSalary").as("annualSalary")
						.and("verificationInfo.accountNo").as("accountNo")
						.and("verificationInfo.assetStatus").as("assetStatus")
						.and("verificationInfo.numberOfFamilyMembers").as("numberOfFamilyMembers")
						.and("verificationInfo.longTermHealthIssues").as("longTermHealthIssues")
						.and("verificationInfo.verifiedBy").as("verifiedBy")

						.and("extractedFilename").as("documentUrl")
		);

		return mongoTemplate.aggregate(
				aggregation,
				"recipient",
				FetchRecipientDTO.class
		).getUniqueMappedResult();
	}
}