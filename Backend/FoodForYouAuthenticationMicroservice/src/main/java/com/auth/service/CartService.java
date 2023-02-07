package com.auth.service;

import java.util.List;

import com.auth.modal.CartModel;
import com.auth.modal.UserModal;

public interface CartService {
	
	public CartModel addProductInCart(CartModel product);
	public List<CartModel> getAllProductFromCart(int userId);
	public List<CartModel> getCartData(UserModal user);
	public CartModel updateCart(CartModel data);
	public CartModel getParticularData(int product_id,int user_id);
	public void deleteProductFromCart(int product_id,int user_id);
	public void deleteAllProductOfParticularUser(int user_id);

}
