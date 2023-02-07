package com.auth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auth.modal.CartModel;
import com.auth.modal.MessageDTO;
import com.auth.modal.UserModal;
import com.auth.service.CartService;

@RestController
@CrossOrigin
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartService cartService;
	
	@GetMapping("/test")
	public String test() {
		return "test cart";
	}

	@PostMapping("/add-cart-data")
	public CartModel addCartData(@RequestBody CartModel data) {
//		System.out.println(data);
		
		CartModel d=this.cartService.getParticularData(data.getProduct_id(), data.getUserData().getUser_id());
		
		if(d==null) {
			return this.cartService.addProductInCart(data);
		}
		return d;
	}
	
	
	@PostMapping("/delete-product-from-cart")
	public ResponseEntity<MessageDTO> deleteProductFromCart(@RequestBody CartModel cartModel) {
		
		this.cartService.deleteProductFromCart(cartModel.getProduct_id(), cartModel.getUserData().getUser_id());
		return new ResponseEntity<MessageDTO>(new MessageDTO("Delete Product Successfull"),HttpStatus.OK);
		
	}
	
	@PutMapping("/update-product-from-cart")
	public ResponseEntity<MessageDTO> updateProductFromCart(@RequestBody CartModel cartModel) {
		
		CartModel d=this.cartService.getParticularData(cartModel.getProduct_id(), cartModel.getUserData().getUser_id());
		cartModel.setProduct_cart_id(d.getProduct_cart_id());
		this.cartService.updateCart(cartModel);
		return new ResponseEntity<MessageDTO>(new MessageDTO("Update Successfull"),HttpStatus.OK);
	}
	
	@DeleteMapping("/clear-cart/{id}")
	public  ResponseEntity<MessageDTO> removeAllProductFromCart(@PathVariable("id") int id) {
		
		this.cartService.deleteAllProductOfParticularUser(id);
		
		return new ResponseEntity<MessageDTO>(new MessageDTO("CLEAR CART"),HttpStatus.OK);

	}
	
	@GetMapping("/get-all-product/{id}")
	public List<CartModel> getAllProductFromCart(@PathVariable("id") int id){
		System.out.println("-----------------"+id);
		return this.cartService.getAllProductFromCart(id);
	}
	
	@GetMapping("/check/campaignID")
	public String getData(@RequestParam String id) {
		return "hello "+id;
	}


	


}
