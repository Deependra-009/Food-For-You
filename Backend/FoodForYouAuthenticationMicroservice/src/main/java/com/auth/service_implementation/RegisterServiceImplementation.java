package com.auth.service_implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.auth.modal.UserModal;
import com.auth.repository.UserRepository;
import com.auth.service.RegisterService;

@Service
public class RegisterServiceImplementation implements RegisterService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	
	@Override
	public UserModal addUser(UserModal userdata) {
		// TODO Auto-generated method stub
		return this.userRepository.save(userdata);
	}

	@Override
	public List<UserModal> getAllUser() {
		// TODO Auto-generated method stub
		return this.userRepository.findAll();
	}

	@Override
	public UserModal getUserData(String email) {
		// TODO Auto-generated method stub
		return this.userRepository.findByEmail(email);
	}

	@Override
	public UserModal updateUserData(UserModal data) {
		return this.userRepository.save(data);
	}

	@Override
	public void sendOTP(String to, String otp) {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
		
				String message=""
						+ "OTP is "+otp+"\n"
						+ "This otp is valid only for 10 minutes";
				
				SimpleMailMessage m=new SimpleMailMessage();
				m.setFrom("flightbookkaro@gmail.com");
				m.setTo(to);
				m.setText(message);
				m.setSubject("Forget Password OTP");
				javaMailSender.send(m);
				System.out.println("mail-sent-successfully");
		
	}

}
