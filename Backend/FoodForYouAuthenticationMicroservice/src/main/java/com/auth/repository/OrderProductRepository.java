package com.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auth.modal.OrderProduct;
import com.auth.modal.Orders;

import jakarta.persistence.criteria.Order;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {

	public List<OrderProduct> findByOrder(Orders order);
}
