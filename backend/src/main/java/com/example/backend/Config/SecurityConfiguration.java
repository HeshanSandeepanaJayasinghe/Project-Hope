package com.example.backend.Config;

import com.example.backend.Filters.JwtFilter;
import com.example.backend.Service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	@Autowired
	private JwtFilter jwtFilter;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		return 	http
					.csrf(AbstractHttpConfigurer::disable)
					.cors(AbstractHttpConfigurer::disable)
					.authorizeHttpRequests(auth->auth
						.requestMatchers("/authenticate/**").permitAll()
						.requestMatchers("/Register/**").permitAll()
						.anyRequest().authenticated()
					)
					.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
					.formLogin(AbstractHttpConfigurer::disable)
					.httpBasic(AbstractHttpConfigurer::disable)
					.build();

	}

	@Bean
	public PasswordEncoder passwordEncoder(){

		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(CustomUserDetailsService userDetailsService, PasswordEncoder encoder){

		DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
		provider.setPasswordEncoder(encoder);
		provider.setUserDetailsService(userDetailsService);
		return new ProviderManager(provider);

	}



}
