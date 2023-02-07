import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import UserData from '../Modals/UserData';
import { CartServiceService } from '../Modals_Service/Cart-Service/cart-service.service';
import { APISERVICEService } from './api-service.service';
import { DataTransferService } from './data-transfer.service';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  loginStatus = new BehaviorSubject(false);
  userName = new BehaviorSubject("User");



  constructor(
    private cartService: CartServiceService
  ) { }

  setToken(token: any) {
    localStorage.setItem("User-Token", token);
  }

  setRole(role: any) {
    localStorage.setItem("User-Role", role);
  }

  getRole() {
    return localStorage.getItem("User-Role")
  }

  getToken() {
    return localStorage.getItem("User-Token");
  }

  isLoggedIn() {
    return localStorage.getItem("User-Token") == null ? false : true;
  }

  loggedOut() {
    localStorage.removeItem("User-Token");
    localStorage.removeItem("User-Email");
    localStorage.removeItem("User-Id");
    localStorage.removeItem("User-Role");

    this.loginStatus.next(false);
    window.location.href = "/"
  }

  setEmail(email: any) {
    localStorage.setItem("User-Email", email);
  }

  getEmail() {
    return localStorage.getItem("User-Email");
  }

  setUserId(id: any) {
    localStorage.setItem("User-Id", id);
  }
  getUserId() {
    return localStorage.getItem("User-Id");
  }

  updateUserData(data: any) {
    this.userName.next(data.fullname);
    this.setUserId(data.user_id);
    this.setEmail(data.email);
    this.setRole(data.authority);
    this.loginStatus.next(true);
    this.cartService.getAllProductFromCart(data.user_id);
  }











}
