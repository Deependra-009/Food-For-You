package com.auth.controller;

import java.util.Collection;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auth.helper.JwtRequest;
import com.auth.helper.JwtResponse;
import com.auth.helper.JwtUtil;
import com.auth.modal.CartModel;
import com.auth.modal.ForgetPasswordDTO;
import com.auth.modal.ForgetPasswordRequestDTO;
import com.auth.modal.MessageDTO;
import com.auth.modal.UserModal;
import com.auth.service.CartService;
import com.auth.service.CustomUserDetailsService;
import com.auth.service_implementation.RegisterServiceImplementation;


@RestController
@CrossOrigin
@RequestMapping("/authentication")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	

	
	@Autowired
	private JwtUtil jwtUtil;
	
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@GetMapping("/test")
	public String test() {
		return "test successfully";
	}
	
	
	
	
	@Autowired
	private RegisterServiceImplementation registerService;

	@PostMapping("/user-register")
	public ResponseEntity<UserModal> userRegisterData(@RequestBody UserModal userdata) {
		userdata.setAuthority("USER");
		System.out.println(userdata);
		UserModal user=this.registerService.addUser(userdata);

		return  new ResponseEntity<UserModal>(user,HttpStatus.OK);
	}
	
	@PostMapping("/token")
	public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest jwtRequest) throws Exception {
		
		System.out.println("jwt"+jwtRequest);
		
		try {
			
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(), jwtRequest.getPassword()));
			
			
		}catch(UsernameNotFoundException e) {
			e.printStackTrace();
			throw new Exception("User Not Found");
		}catch(BadCredentialsException e) {
			e.printStackTrace();
			throw new Exception("Bad Credentials!!!");
		}
		
		UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(jwtRequest.getEmail());
		System.out.println("-->>."+userDetails);
		String token = this.jwtUtil.generateToken(userDetails);
		String username=userDetails.getUsername();
		String password=userDetails.getPassword();
		Collection<? extends GrantedAuthority> authority=userDetails.getAuthorities();
		
	
		
		return ResponseEntity.ok(new JwtResponse(token,username,password,authority,true));
		
		
	}
	
	@GetMapping("/get-all-user")
	public List<UserModal> getAllUser(){
		return this.registerService.getAllUser();
	}
	
	@GetMapping("/get-user-data/{email}")
	public UserModal getUserData(@PathVariable("email") String email,boolean update) {
		System.out.println("=>>>"+email);
		UserModal data=this.registerService.getUserData(email);
		if(update==false) {
			data.setPassword(null);
		}
		return data;
	}
	
	@PutMapping("/update-user-data")
	public UserModal updateUserData(@RequestBody UserModal modal) {
		UserModal user=getUserData(modal.getEmail(),true);
		user.setAddress(modal.getAddress());
		user.setFullname(modal.getFullname());
		user.setPincode(modal.getPincode());
		return this.registerService.updateUserData(user);
	
	}
	
	@PostMapping("/update-password")
	public ResponseEntity<MessageDTO> updatePassword(@RequestBody UserModal modal) {
		UserModal user=getUserData(modal.getEmail(),true);
		user.setPassword(modal.getPassword());
		this.registerService.updateUserData(user);
		MessageDTO message=new MessageDTO("PASSWORD UPDATE SUCCESSFULLY");
		System.out.println(message);
		return new ResponseEntity<MessageDTO>(message,HttpStatus.OK);
	}
	
	@PostMapping("/update-forget-password")
	public ResponseEntity<MessageDTO> updateFogetPassword(@RequestBody UserModal modal) {
		UserModal user=getUserData(modal.getEmail(),true);
		user.setPassword(modal.getPassword());
		this.registerService.updateUserData(user);
		MessageDTO message=new MessageDTO("PASSWORD UPDATE SUCCESSFULLY");
		System.out.println(message);
		return new ResponseEntity<MessageDTO>(message,HttpStatus.OK);
	}
	
	
	@PostMapping("/forget-password")
	public ResponseEntity<UserModal> getForgetPasswordData(@RequestBody ForgetPasswordRequestDTO data) throws Exception{
//		System.out.println("forget password");
//		System.out.println("---->"+data);
		UserModal userdata=getUserData(data.getEmail(),true);
//		System.out.println("=>"+userdata);
		if(userdata==null) throw new Exception("User Not Found");
		return new ResponseEntity<UserModal>(userdata,HttpStatus.OK);
	}
	
	@GetMapping("/send-otp/{email}")
	public ResponseEntity<ForgetPasswordDTO> sendOTP(@PathVariable("email") String email) {
		System.out.println("email"+email);
		Random random=new Random();
		int otp=random.nextInt(999999);
		System.out.println("otp"+otp);
		
//		registerService.sendOTP(email, String.valueOf(otp));
		
		return new ResponseEntity<ForgetPasswordDTO>(new ForgetPasswordDTO(String.valueOf(otp), email),HttpStatus.OK);
	}
	
	
	
	
}
