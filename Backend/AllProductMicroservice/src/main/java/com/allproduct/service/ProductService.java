package com.allproduct.service;

import java.util.List;

import com.allproduct.modals.ProductModal;
import com.allproduct.modals.RestaurantModal;

public interface ProductService {
	
	public ProductModal addProduct(ProductModal product);
	public List<ProductModal> getAllProduct();
	public List<ProductModal> getParticularRestaurantProducts(RestaurantModal restaurant);
	public ProductModal updateProduct(ProductModal product);
}
