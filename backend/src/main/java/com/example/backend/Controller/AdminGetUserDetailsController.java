package com.example.backend.Controller;


import com.example.backend.DTO.Trnasfers.AdminUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminGetUserDetailsController {

@Autowired
private AdminUserDetails adminUserDetails;

@GetMapping("/getUsers")
public ResponseEntity<?> getAllUsers(){

	System.out.println("Hello world");
	return ResponseEntity.ok(adminUserDetails.getUserDetails());


}


}
