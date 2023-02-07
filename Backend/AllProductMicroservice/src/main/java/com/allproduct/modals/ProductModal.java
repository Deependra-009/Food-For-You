package com.allproduct.modals;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "ProductTable")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductModal {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int product_id;
	private String product_name;
	private String product_price;
	@Lob
	@Column()
	private String product_description;
	private String product_image;
	private String created_at;
	private String updated_at;
	private String category;
	private String type;
	private int no_of_items=1;
	private boolean available;
	private boolean isPresentInCart;
	private boolean is_recommended;
	
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	private RestaurantModal restaurant;

	
}
