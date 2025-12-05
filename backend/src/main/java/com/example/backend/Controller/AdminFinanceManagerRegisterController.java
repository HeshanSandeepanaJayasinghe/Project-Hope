package com.example.backend.Controller;

import com.example.backend.DTO.Admin_FinancialRegisterDTO;
import com.example.backend.Model.Admin;
import com.example.backend.Model.FinancialManager;
import com.example.backend.Model.User;
import com.example.backend.Repositories.AdminRepository;
import com.example.backend.Repositories.FinancialManagerRepository;
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
@RequestMapping("/superadmin/register")
public class AdminFinanceManagerRegisterController {

@Autowired
private UserRepository userRepo;

@Autowired
private AdminRepository adminRepository;

@Autowired
private FinancialManagerRepository financialManagerRepository;

@Autowired
private PasswordEncoder encoder;

@PostMapping("/admin")
public ResponseEntity<?> registerAdmin(@RequestBody Admin_FinancialRegisterDTO req) {

	User user = new User();
	user.setRole(User.Role.ADMIN);
	user.setEmail(req.getEmail());
	user.setPassword(encoder.encode(req.getPassword()));
	userRepo.save(user);

	Admin admin = new Admin();
	admin.setUserId(user.getId());
	admin.setFullName(req.getFullName());
	admin.setPhoneNumber(req.getPhoneNumber());
	adminRepository.save(admin);

	return ResponseEntity.ok(Map.of("Message", "Successfully registered the admin."));

}@PostMapping("/financemanager")
public ResponseEntity<?> registerFinanceManager(@RequestBody Admin_FinancialRegisterDTO req) {

	User user = new User();
	user.setRole(User.Role.FINANCIAL_MANAGER);
	user.setEmail(req.getEmail());
	user.setPassword(encoder.encode(req.getPassword()));
	userRepo.save(user);

	FinancialManager finance = new FinancialManager();
	finance.setUserId(user.getId());
	finance.setFullName(req.getFullName());
	finance.setPhoneNumber(req.getPhoneNumber());
	financialManagerRepository.save(finance);

	return ResponseEntity.ok(Map.of("Message", "Successfully registered the finance manager."));

}


}
