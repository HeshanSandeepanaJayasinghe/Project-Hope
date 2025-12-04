package com.example.backend.Service;

import com.example.backend.Model.Fundraiser;
import com.example.backend.Model.FundraiserVerification;
import com.example.backend.Repositories.FundraiserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateUserStatusService {

@Autowired
private FundraiserRepository fundraiserRepository;

public void updateUserStatus(ObjectId id,String status){

	Fundraiser fundraiser=fundraiserRepository.findByUserId(id).orElseThrow();
	Fundraiser.Status newStatus;
	try {
		newStatus = Fundraiser.Status.valueOf(status.toUpperCase());
	} catch (IllegalArgumentException e) {
		throw new RuntimeException("Invalid status value: " + status);
	}

	fundraiser.setStatus(newStatus);
	fundraiserRepository.save(fundraiser);

}




}
