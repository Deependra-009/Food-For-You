package com.allproduct.service_implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allproduct.modals.RestaurantModal;
import com.allproduct.repository.RestaurantRepository;
import com.allproduct.service.RestaurantService;

@Service
public class RestaurantServiceImplementation implements RestaurantService {
	
	@Autowired
	private RestaurantRepository restaurantRepo;

	@Override
	public RestaurantModal addRestaurant(RestaurantModal restaurant) {
		// TODO Auto-generated method stub
		return this.restaurantRepo.save(restaurant);
	}

	@Override
	public List<RestaurantModal> getAllRestaurant() {
		// TODO Auto-generated method stub
		return this.restaurantRepo.findAll();
	}

}
