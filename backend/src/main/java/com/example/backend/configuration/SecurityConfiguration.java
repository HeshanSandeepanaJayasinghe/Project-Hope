package com.example.backend.configuration;

import com.example.backend.authentication.CustomUserDetailsService;
import com.example.backend.filter.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration {

	private final CustomUserDetailsService customUserDetailsService;
	private final JwtFilter jwtFilter;

	public SecurityConfiguration(CustomUserDetailsService customUserDetailsService, JwtFilter jwtFilter) {
		this.customUserDetailsService = customUserDetailsService;
		this.jwtFilter = jwtFilter;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf(AbstractHttpConfigurer::disable)
			.authorizeHttpRequests(auth -> auth
				.requestMatchers("/authenticate/**").permitAll()
				.requestMatchers("/register/superadmin/**").permitAll()
				.requestMatchers("/superadmin/**").hasRole("SUPERADMIN")
				.requestMatchers("/admin/**").hasRole("ADMIN")
				.requestMatchers("/recipient/**").hasRole("RECIPIENT")
				.requestMatchers(
							"/swagger-ui/**",
							"/v3/api-docs/**",
							"/swagger-ui.html"
				).permitAll()
				.anyRequest().authenticated()
			)
			.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
			.sessionManagement(session -> session
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager() {
		DaoAuthenticationProvider authenticationProvider =
			new DaoAuthenticationProvider((UserDetailsService) customUserDetailsService);
		authenticationProvider.setPasswordEncoder(passwordEncoder());

		ProviderManager providerManager = new ProviderManager(authenticationProvider);
		providerManager.setEraseCredentialsAfterAuthentication(false);

		return providerManager;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
