package com.auth.service_implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth.modal.CartModel;
import com.auth.modal.UserModal;
import com.auth.repository.CartRepository;
import com.auth.service.CartService;

@Service
public class CartServiceImplementation implements CartService{
	
	@Autowired
	private CartRepository cartRepository;

	@Override
	public CartModel addProductInCart(CartModel product) {
		// TODO Auto-generated method stub
		return this.cartRepository.save(product);
	}

	public List<CartModel> getAllProductFromCart(int userId) {
		// TODO Auto-generated method stub
		return this.cartRepository.getAllProduct(String.valueOf(userId));
	}

	@Override
	public List<CartModel> getCartData(UserModal user) {
		// TODO Auto-generated method stub
		return this.cartRepository.findByUserData(user);
	}

	@Override
	public CartModel updateCart(CartModel data) {
		// TODO Auto-generated method stub
		return this.cartRepository.save(data);
	}

	@Override
	public CartModel getParticularData(int product_id, int user_id) {
		// TODO Auto-generated method stub
//		System.out.println(this.cartRepository.getParticularProduct(String.valueOf(user_id),String.valueOf(product_id)));
		return this.cartRepository.getParticularProduct(String.valueOf(user_id),String.valueOf(product_id));
		
	}

	@Override
	public void deleteProductFromCart(int product_id, int user_id) {
		// TODO Auto-generated method stub
		
		this.cartRepository.deleteParticularProduct(String.valueOf(product_id), String.valueOf(user_id));
		
	}

	@Override
	public void deleteAllProductOfParticularUser(int user_id) {
		// TODO Auto-generated method stub
		
		this.cartRepository.deleteAllProductOfParticularUser(String.valueOf(user_id));
		
	}
	
		
	
}
