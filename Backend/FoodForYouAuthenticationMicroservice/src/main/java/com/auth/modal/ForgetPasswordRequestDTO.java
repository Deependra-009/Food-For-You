package com.auth.modal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ForgetPasswordRequestDTO {
	
	private String email;
	private String systemotp;
	private String userotp;
	

}
