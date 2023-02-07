package com.auth.service;

import java.util.List;

import com.auth.modal.OrderProduct;
import com.auth.modal.Orders;

public interface OrderService {
	
	public Orders addOrder(Orders order_data);
	public OrderProduct addOrderProduct(OrderProduct order_product);
	public List<Orders> getOrder(int userId);
	public List<OrderProduct> getOrderProduct(Orders order);
	
	
}
