package com.auth.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="order_product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderProduct {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int order_product_id;
	private String product_name;
	private String product_quantity;
	private String product_price;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private Orders order;

}
