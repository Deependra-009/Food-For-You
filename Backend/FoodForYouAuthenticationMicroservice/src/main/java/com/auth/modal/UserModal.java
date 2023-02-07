package com.auth.modal;

import java.util.List;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="User Table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@ToString
public class UserModal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int user_id;
	
	@Column(unique = true)
	private String email;
	private String password;
	private String fullname;
	private String phone_number;
	private String address;
	private String pincode;
	private String authority;
	private boolean active=true;
	
	@OneToMany(mappedBy="userData",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	@JsonIgnore
//	@JoinColumn(name="restuarant_id",referencedColumnName = "restuarant_id")
	private Set<CartModel> products;

}
