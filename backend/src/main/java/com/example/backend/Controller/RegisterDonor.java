package com.example.backend.Controller;


import com.example.backend.DTO.RegisterDonorDTO;
import com.example.backend.Model.Donor;
import com.example.backend.Model.User;
import com.example.backend.Repositories.DonorRepository;
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
@RequestMapping("/register")
public class RegisterDonor {

@Autowired
private UserRepository userRepo;

@Autowired
private DonorRepository donorRepo;

@Autowired
private PasswordEncoder encoder;


@PostMapping("/donor")
public ResponseEntity<?> registerDonor(@RequestBody RegisterDonorDTO req){

	User user= new User();
	user.setEmail(req.getEmail());
	user.setPassword(encoder.encode(req.getPassword()));
	user.setRole(User.Role.DONOR);

	userRepo.save(user);

	Donor donor=new Donor();
	donor.setName(req.getName());
	donor.setUserId(user.getId());
	donor.setOccupation(req.getOccupation());
	donor.setOrganization(req.getOrganization());

	donorRepo.save(donor);

	return ResponseEntity.ok(
		Map.of("Message","Donor registered successfully")
	);
}



}
