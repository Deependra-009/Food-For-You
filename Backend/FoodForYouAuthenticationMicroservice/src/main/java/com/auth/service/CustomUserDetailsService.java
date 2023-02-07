package com.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.auth.modal.CustomUserDetails;
import com.auth.modal.UserModal;
import com.auth.repository.UserRepository;


@Service
public class CustomUserDetailsService  implements UserDetailsService{
	
	@Autowired
	private UserRepository registerRepository;

	@Override
	public UserDetails loadUserByUsername(String email) {
		// TODO Auto-generated method stub
		UserModal data=this.registerRepository.findByEmail(email);

		if(data==null  || data.isActive()==false) {
			throw new UsernameNotFoundException("User not found");
		}
		
		System.out.println("email"+data.getEmail()+" "+data.getPassword()+" "+data.getAuthority());
		
		
		
		return new CustomUserDetails(data);
		
	}

}
