package com.auth.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth.modal.OrderProduct;
import com.auth.modal.Orders;
import com.auth.service_implementation.OrderServiceImplementation;

@RestController
@CrossOrigin
@RequestMapping("/order")
public class OrderController {

	@Autowired
	private OrderServiceImplementation orderServiceImplementation;

	@GetMapping("/test")
	public String check() {
		return "check order";
	}

	@PostMapping("/add-order")
	public Orders addOrder(@RequestBody Orders order_data) {
		System.out.println(order_data);
//		String ID=UUID.randomUUID().toString();
		order_data.setOrder_user_id(generateID());
		return this.orderServiceImplementation.addOrder(order_data);
//		return null;

	}
	
	private String generateID() {
		
		String Number = "0123456789";
		int n = 10;

		StringBuilder referenceNumber = new StringBuilder(n);

		for (int i = 0; i < n; i++) {

			// generate a random number between
			// 0 to AlphaNumericString variable length
			int index = (int) (Number.length() * Math.random());

			// add Character one by one in end of sb
			referenceNumber.append(Number.charAt(index));
		}
		return referenceNumber.toString();
	}
	
	@PostMapping("/add-product")
	public OrderProduct addProduct(@RequestBody OrderProduct order_product) {
		return this.orderServiceImplementation.addOrderProduct(order_product);
	}

	@GetMapping("/get-order/{id}")
	public List<Orders> getOrder(@PathVariable("id") int id) {
		System.out.println("id"+id);
		
		List<Orders> order=this.orderServiceImplementation.getOrder(id);
		return order;
	}
	
	@GetMapping("/get-order-product/{id}")
	public List<OrderProduct> getOrderProduct(@PathVariable("id") int id) {
		System.out.println("id"+id);
		Orders order=new Orders();
		order.setOrder_id(id);
		return this.orderServiceImplementation.getOrderProduct(order);
	}

}
