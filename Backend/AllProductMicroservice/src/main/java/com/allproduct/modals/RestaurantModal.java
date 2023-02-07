package com.allproduct.modals;

import java.util.List;
import java.util.Set;

import org.springframework.data.convert.WritingConverter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name="RestaurantTable")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RestaurantModal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int restaurant_id;
	
	private String restaurant_name;
	private String restaurant_address;
	private String restaurant_phoneno;
	private String restaurant_review;
	private String restaurant_owner;
	private String restaurant_type;
	private String restaurant_rating;
	private String restaurant_images;
	private String restaurant_tags;
	private String first_offer;
	private String second_offer;
	private String restaurant_delievery_time;
	private String created_at;
	private String updated_at;
	private boolean active;
	
	@OneToMany(mappedBy="restaurant",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	@JsonIgnore
//	@JoinColumn(name="restuarant_id",referencedColumnName = "restuarant_id")
	private Set<ProductModal> products;
	
	

}
