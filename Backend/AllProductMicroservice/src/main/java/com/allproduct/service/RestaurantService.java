package com.allproduct.service;

import java.util.List;

import com.allproduct.modals.RestaurantModal;

public interface RestaurantService {
	
	public RestaurantModal addRestaurant(RestaurantModal restaurant);
	public List<RestaurantModal> getAllRestaurant();
}
