package com.example.backend.Filters;

import com.example.backend.Service.CustomUserDetails;
import com.example.backend.Service.CustomUserDetailsService;
import com.example.backend.Util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Service
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

		final String authHeader=request.getHeader("Authorization");
		final String token;
		final String email;

		if(authHeader==null|| !authHeader.startsWith("Bearer")){

			filterChain.doFilter(request,response);
			return;

		}

		token=authHeader.substring(7);
		email=jwtUtil.extractEmail(token);

		if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null){

			CustomUserDetails user= (CustomUserDetails) customUserDetailsService.loadUserByUsername(email);

			if(jwtUtil.isValid(token,user)){

				UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
				System.out.println("Authorities: " + user.getAuthorities());

			}

			filterChain.doFilter(request,response);

		}



	}
}
