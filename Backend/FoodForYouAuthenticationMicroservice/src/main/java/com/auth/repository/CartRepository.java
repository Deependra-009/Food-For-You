package com.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.auth.modal.CartModel;
import com.auth.modal.UserModal;

import feign.Param;
import io.micrometer.common.lang.Nullable;
import jakarta.transaction.Transactional;

@Repository
public interface CartRepository extends JpaRepository<CartModel, Integer> {
	
	public List<CartModel> findByUserData(UserModal userdata);
//	@Query("select fd from FlightData fd where fd.arrival LIKE %?1%  and fd.destination LIKE %?2%  ")
	
	@Query("select fd FROM CartModel fd where fd.product_id=:product_id and fd.userData.user_id=:user_id ")
	public CartModel getParticularProduct(@Param("user_id") String user_id,@Param("product_id") String product_id);
	
	@Query("select fd FROM CartModel fd where fd.userData.user_id=:user_id ")
	public List<CartModel> getAllProduct(@Param("user_id") String user_id);
	
	@Modifying
	@Transactional
	@Query("delete FROM CartModel cm where cm.product_id=:product_id and cm.userData.user_id=:user_id")
	public void deleteParticularProduct(@Param("product_id") String product_id,@Param("user_id") String user_id);
	
	@Modifying
	@Transactional
	@Query("delete FROM CartModel cm where cm.userData.user_id=:user_id")
	public void deleteAllProductOfParticularUser(@Param("user_id") String user_id);
	
	
	
}
