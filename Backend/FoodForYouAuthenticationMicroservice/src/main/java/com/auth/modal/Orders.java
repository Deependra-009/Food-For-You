package com.auth.modal;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Orders {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int order_id;
	private String order_user_id;
	private String order_name;
	private String order_date;
	private String order_total_price;
	private String order_payment_mode;
	private String user_id;
	private String restaurant_name;
	private String discount;
	
	
	@OneToMany(mappedBy="order",cascade = CascadeType.ALL)
	@JsonIgnore
	List<OrderProduct> order_product_list;
	
	
	
	
	
	
	
	
	
	
	

}
