package com.example.backend.Controller;


import com.example.backend.DTO.LoginDTO;
import com.example.backend.Model.User;
import com.example.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate")
public class AuthTest {

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private UserRepository userRepo;

	@PostMapping("/register")
	public void register(@RequestBody  LoginDTO res){

		System.out.println("Hello world");
		User user=new User();
		user.setEmail(res.getEmail());
		user.setPassword(encoder.encode(res.getPassword()));
		user.setRole(User.Role.valueOf("ADMIN"));
		userRepo.save(user);

	}


}
