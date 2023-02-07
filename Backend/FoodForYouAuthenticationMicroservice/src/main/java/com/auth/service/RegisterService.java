package com.auth.service;

import java.util.List;

import com.auth.modal.UserModal;

public interface RegisterService {
	
	public UserModal addUser(UserModal userdata);
	public List<UserModal> getAllUser();
	public UserModal getUserData(String email);
	public UserModal updateUserData(UserModal data);
	public void sendOTP(String to,String otp);

}
