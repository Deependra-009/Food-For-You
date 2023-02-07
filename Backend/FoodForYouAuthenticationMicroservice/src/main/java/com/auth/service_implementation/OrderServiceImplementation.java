package com.auth.service_implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth.modal.OrderProduct;
import com.auth.modal.Orders;
import com.auth.repository.OrderProductRepository;
import com.auth.repository.OrderRepository;
import com.auth.service.OrderService;

@Service
public class OrderServiceImplementation implements OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderProductRepository orderProductRepository;
	
	@Override
	public Orders addOrder(Orders order_data) {
		// TODO Auto-generated method stub
		return this.orderRepository.save(order_data);
	}

	@Override
	public OrderProduct addOrderProduct(OrderProduct order_product) {
		// TODO Auto-generated method stub
		return this.orderProductRepository.save(order_product);
	}

	@Override
	public List<Orders> getOrder(int userId) {
		// TODO Auto-generated method stub
		System.out.println("===>>"+userId);
		return this.orderRepository.findByUserId(String.valueOf(userId));
//		return null;
	}

	@Override
	public List<OrderProduct> getOrderProduct(Orders order) {
		// TODO Auto-generated method stub
		
		return this.orderProductRepository.findByOrder(order);
	}

}
