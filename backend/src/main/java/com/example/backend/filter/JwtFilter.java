package com.example.backend.filter;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.authentication.CustomUserDetailsService;
import com.example.backend.utility.JwtUtilities;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

	private final JwtUtilities jwtUtilities;
	private final CustomUserDetailsService customUserDetailsService;

	public JwtFilter(JwtUtilities jwtUtilities, CustomUserDetailsService customUserDetailsService) {
		this.jwtUtilities = jwtUtilities;
		this.customUserDetailsService = customUserDetailsService;
	}

	@Override
	protected void doFilterInternal(
		HttpServletRequest request,
		HttpServletResponse response,
		FilterChain filterChain
	) throws ServletException, IOException {

		final String authHeader = request.getHeader("Authorization");
		String jwtToken;
		String username;

		if (authHeader==null || !authHeader.startsWith("Bearer")) {
			filterChain.doFilter(request, response);
			return;
		}

		jwtToken = authHeader.substring(7);
		username = jwtUtilities.extractUsername(jwtToken);

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			CustomUserDetails userDetails =
				(CustomUserDetails) customUserDetailsService.loadUserByUsername(username);

			if (jwtUtilities.isTokenValid(jwtToken, userDetails)) {
				UsernamePasswordAuthenticationToken authenticationToken=
					new UsernamePasswordAuthenticationToken(
							userDetails,
							null,
							userDetails.getAuthorities()
					);

				authenticationToken.setDetails(
					new WebAuthenticationDetailsSource().buildDetails(request)
				);

				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			}
		}
	filterChain.doFilter(request, response);
	}
}
