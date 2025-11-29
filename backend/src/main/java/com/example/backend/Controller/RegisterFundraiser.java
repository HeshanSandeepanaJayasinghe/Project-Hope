package com.example.backend.Controller;


import com.example.backend.DTO.RegisterFundraiserDTO;
import com.example.backend.Model.Fundraiser;
import com.example.backend.Model.User;
import com.example.backend.Repositories.FundraiserRepository;
import com.example.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping ("/register")
public class RegisterFundraiser {

@Autowired
private PasswordEncoder encoder;

@Autowired
private UserRepository userRepo;

@Autowired
private FundraiserRepository fundraiserRepository;

@PostMapping("/fundraiser")
public ResponseEntity<?> registerFundraiser(@RequestBody RegisterFundraiserDTO req){

	User user=new User();
	user.setEmail(req.getEmail());
	user.setPassword(encoder.encode(req.getPassword()));
	user.setRole(User.Role.FUNDRAISER);
	userRepo.save(user);

	Fundraiser fundraiser=new Fundraiser();
	fundraiser.setUserId(user.getId());
	fundraiser.setName(req.getName());
	fundraiser.setNic(req.getNic());
	fundraiser.setAddress(req.getAddress());
	fundraiser.setBirthday(req.getBirthday());
	fundraiser.setPostalCode(req.getPostalCode());
	fundraiser.setTelephone(req.getTelephone());
	fundraiser.setStatus(Fundraiser.Status.NON_VERIFIED);
	fundraiserRepository.save(fundraiser);


	return ResponseEntity.ok(

		Map.of("Message","Successfully registered")

	);

}



}
