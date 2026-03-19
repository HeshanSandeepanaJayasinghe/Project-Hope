package com.example.backend.authentication;


import com.example.backend.user.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

	private  final User user;

	public CustomUserDetails(User user){
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<User.Role> roles = user.getRoles();

		return roles.stream()
					.map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
					.toList();
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {

		return user.getEmail();
	}

	public String getUserId() {
		return user.getUserId();
	}
}
