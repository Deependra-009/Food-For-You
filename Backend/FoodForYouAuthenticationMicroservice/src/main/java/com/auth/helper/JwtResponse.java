package com.auth.helper;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
	
	private String token;
	private String email;
	private String password;
	Collection<? extends GrantedAuthority> authority;
	private boolean active;

}
