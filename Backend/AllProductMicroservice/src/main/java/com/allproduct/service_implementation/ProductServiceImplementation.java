package com.allproduct.service_implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allproduct.modals.ProductModal;
import com.allproduct.modals.RestaurantModal;
import com.allproduct.repository.ProductRepository;
import com.allproduct.service.ProductService;

@Service
public class ProductServiceImplementation implements ProductService {
	
	@Autowired
	private ProductRepository productRepo;

	@Override
	public ProductModal addProduct(ProductModal product) {
		// TODO Auto-generated method stub
		
		return this.productRepo.save(product);
	}

	@Override
	public List<ProductModal> getAllProduct() {
		// TODO Auto-generated method stub
		return this.productRepo.findAll();
	}

	@Override
	public List<ProductModal> getParticularRestaurantProducts(RestaurantModal restaurant) {
		// TODO Auto-generated method stub
		System.out.println("-"+restaurant);
		return this.productRepo.findByrestaurant(restaurant);
	}

	@Override
	public ProductModal updateProduct(ProductModal product) {
		// TODO Auto-generated method stub
		return this.productRepo.save(product);
	}
	

}
