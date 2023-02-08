package com.allproduct.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.allproduct.modals.DataAddModal;
import com.allproduct.modals.ProductModal;
import com.allproduct.modals.RestaurantModal;
import com.allproduct.service_implementation.ProductServiceImplementation;
import com.allproduct.service_implementation.RestaurantServiceImplementation;

@RestController
@RequestMapping("/all-product")
@CrossOrigin
public class Controller {

	@Autowired
	private ProductServiceImplementation productService;

	@Autowired
	private RestaurantServiceImplementation restaurantService;
	

	@GetMapping("/test")
	public String test() {
		return "test";
	}

	@PostMapping("/add-product")
	public ProductModal addProduct(@RequestBody ProductModal product) {

		return this.productService.addProduct(product);

	}
	@PostMapping("/add-restaurant")
	public RestaurantModal addRestaurant(@RequestBody RestaurantModal restaurant) {
			
		return this.restaurantService.addRestaurant(restaurant);

	}
	
	@GetMapping("get-all-product")
	private List<ProductModal> getAllProduct(){
		return this.productService.getAllProduct();
	}
	
	@GetMapping("get-all-restaurant")
	private List<RestaurantModal> getAllRestaurant(){
		return this.restaurantService.getAllRestaurant();
	}
	
	@GetMapping("/get-particular-restaurant-products/{restuarant_id}")
	private List<ProductModal> getParticularRestaurantProducts(@PathVariable("restuarant_id") int restuarant_id){
		
		RestaurantModal restaurant=new RestaurantModal();
		restaurant.setRestaurant_id(restuarant_id);
		System.out.println(restaurant);
		return this.productService.getParticularRestaurantProducts(restaurant);
	}
	
	
	//************* temp *******************************/
	@PostMapping("/add-product-restaurant")
	private String addAllProduct(@RequestBody DataAddModal restaurant) {
		System.out.println(restaurant);
		Set<ProductModal> product=restaurant.getData();
		System.out.println(product);
		RestaurantModal rm=new RestaurantModal();
		rm.setRestaurant_id(152);
		
		for(ProductModal item:product) {
			item.setRestaurant(rm);
			this.productService.addProduct(item);
		}
		
		return "data added";
	}
	
	@PutMapping("/update-product")
	private void updateProduct(@RequestBody ProductModal product) {
		this.productService.updateProduct(product);
	}
	
	@GetMapping("/update-multiple-product/{restaurant_id}")
	private List<ProductModal> updateMultipleProduct(@PathVariable("restaurant_id") int restaurant_id){
		RestaurantModal restaurant=new RestaurantModal();
		restaurant.setRestaurant_id(restaurant_id);
		System.out.println(restaurant);
		List<ProductModal> list= this.productService.getParticularRestaurantProducts(restaurant);
		
		for(ProductModal product:list) {
			product.setPresentInCart(false);
			this.updateProduct(product);
		}
		return list;
		
	}
	
	/******************** Search Product ***************************/
	
	@GetMapping("/search-product/{keyword}")
	private List<ProductModal> searchProduct(@PathVariable("keyword") String keyword) {
		
		return this.productService.searchProduct(keyword);
		

	}

	
	

}
