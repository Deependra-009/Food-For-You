package com.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auth.modal.UserModal;

@Repository
public interface UserRepository extends JpaRepository<UserModal, Integer> {
	
	public UserModal findByEmail(String email);
}
