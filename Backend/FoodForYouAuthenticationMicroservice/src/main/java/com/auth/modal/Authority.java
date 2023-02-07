package com.auth.modal;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Authority implements GrantedAuthority {
	
	private String authority;

	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return this.getAuthority();
	}

}
