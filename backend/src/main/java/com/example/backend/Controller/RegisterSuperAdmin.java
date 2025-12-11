package com.example.backend.Controller;


import com.example.backend.Model.SuperAdmin;
import com.example.backend.Model.User;
import com.example.backend.Repositories.SuperAdminRepository;
import com.example.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/register")
public class RegisterSuperAdmin {

@Autowired
private PasswordEncoder passwordEncoder;

@Autowired
private UserRepository userRepository;

@Autowired
private SuperAdminRepository superAdminRepository;

@PostMapping("/superadmin")
public ResponseEntity<?> registerSuperAdmin(  @RequestParam String name,
											  @RequestParam String email,
											  @RequestParam String password){

	User user=new User();
	user.setEmail(email);
	user.setPassword(passwordEncoder.encode(password));
	user.setRole(User.Role.SUPER_ADMIN);

	userRepository.save(user);

	SuperAdmin superAdmin=new SuperAdmin();
	superAdmin.setUserId(user.getId());
	superAdmin.setName(name);
	superAdminRepository.save(superAdmin);

	return ResponseEntity.ok(Map.of("Message","Successfully registered the super admin."));

}

}
