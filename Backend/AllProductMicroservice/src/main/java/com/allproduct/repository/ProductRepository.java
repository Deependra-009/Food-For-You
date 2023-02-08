package com.allproduct.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.allproduct.modals.ProductModal;
import com.allproduct.modals.RestaurantModal;

@Repository
public interface ProductRepository extends JpaRepository<ProductModal, Integer> {
	
	public List<ProductModal> findByrestaurant(RestaurantModal restaurant);
	
	@Query("select fd FROM ProductModal fd where fd.product_name like %:searchKeyword%")
	public List<ProductModal> getSearchProduct(@Param("searchKeyword") String searchKeyword);
	
}
