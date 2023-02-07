package com.auth.modal;

import org.hibernate.annotations.ManyToAny;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="CartTable")
@Getter
@Setter
@NoArgsConstructor@AllArgsConstructor
@ToString
public class CartModel {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int product_cart_id;
	private int product_id;
	private int restaurant_id;
	private String name;
	private String description;
	private String tag;
	private String quantity;
	private String original_price;
	private String total_price;
	private boolean checked;
	
	
	@ManyToOne(fetch=FetchType.EAGER)
	private UserModal userData; 
	
	
	
	
	
	
	

}
