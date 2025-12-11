package com.example.backend.Controller;


import com.example.backend.DTO.VerificationFundariserDTO;
import com.example.backend.Model.FundraiserVerification;
import com.example.backend.Repositories.VerificationFundraiser;
import com.example.backend.Service.CustomUserDetails;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/fundraiser")
public class VerificationFundariserDetailsController {

@Autowired
private VerificationFundraiser verificationFundraiser;


@PostMapping("/verifyDetails")
public ResponseEntity<?> provideDetails(@RequestBody VerificationFundariserDTO req){

Authentication auth = SecurityContextHolder.getContext().getAuthentication();
CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
ObjectId userId = userDetails.getUserId();
	System.out.println(userId);

FundraiserVerification user=new FundraiserVerification();
user.setUser_id( userId);
user.setProvince(req.getProvince());
user.setDistrict(req.getDistrict());
user.setDivisionalSecretarial(req.getDivisionalSecretarial());
user.setGramaNiladhariDivision(req.getGramaNiladhariDivision());
user.setOccupation(req.getOccupation());
user.setEmploymentCategory(req.getEmploymentCategory());
user.setAnnualSalary(req.getAnnualSalary());
user.setAssetStatus(req.getAssetStatus());
user.setNumberOfFamilyMembers(req.getNumberOfFamilyMembers());
user.setLongTermHealthIssues(req.getLongTermHealthIssues());

verificationFundraiser.save(user);
return ResponseEntity.ok(Map.of("Message","Successfully added the verification details."))	;

}


}
