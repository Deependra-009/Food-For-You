package com.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.auth.modal.CartModel;
import com.auth.modal.Orders;

import feign.Param;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {
	
	@Query("select fd FROM Orders fd where fd.user_id=:user_id ")
	public List<Orders> findByUserId(String user_id);

}
