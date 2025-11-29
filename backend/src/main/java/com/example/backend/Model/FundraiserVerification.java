package com.example.backend.Model;




import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class FundraiserVerification {

@Id
private String id;
private String user_id;
private String province;
private String district;
private String divisionalSecretarial;
private String gramaNiladhariDivision;
private String occupation;
private String employmentCategory;
private Double annualSalary;  // Use Double for numeric salary
private String assetStatus;
private Integer numberOfFamilyMembers;
private String longTermHealthIssues;

}