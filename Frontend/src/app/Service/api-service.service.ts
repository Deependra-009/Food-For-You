import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import UserData from '../Modals/UserData';
import { DataTransferService } from './data-transfer.service';
import URL from './URL';

@Injectable({
  providedIn: 'root'
})
export class APISERVICEService {

  constructor(
    private http: HttpClient,
  ) { }


  /*********************** ALLPRODUCT CONTROLLER ************************************/
  getAllRestaurant() {
    return this.http.get(`${URL.AllProductMicroservice}/get-all-restaurant`);
  }

  getParticularRestaurantProducts(id: any) {

    return this.http.get(`${URL.AllProductMicroservice}/get-particular-restaurant-products/${id}`)
  }

  getSearchProduct(keyword:String){
    return this.http.get(`${URL.AllProductMicroservice}/search-product/${keyword}`);
  }



  /*********************** AUTHENTICATION CONTROLLER ************************************/

  registerUserData(UserData: UserData) {
    return this.http.post(`${URL.AuthenticationMicroservice}/authentication/user-register`, UserData);
  }

  loginUser(LoginData: any) {
    return this.http.post(`${URL.AuthenticationMicroservice}/authentication/token`, LoginData);
  }

  getAllUser() {
    return this.http.get(`${URL.AuthenticationMicroservice}/authentication/get-all-user`);
  }

  getUserData(email: String) {
    return this.http.get(`${URL.AuthenticationMicroservice}/authentication/get-user-data/${email}`);
  }

  updateUserData(data:any){
    return this.http.put(`${URL.AuthenticationMicroservice}/authentication/update-user-data`,data)
  }

  updatePassword(data:any){
    return this.http.post(`${URL.AuthenticationMicroservice}/authentication/update-password`,data);
  }

  getForgetPasswordData(data:any){
    return this.http.post(`${URL.AuthenticationMicroservice}/authentication/forget-password`,data);
  }

  sendOTP(email:any){
    return this.http.get(`${URL.AuthenticationMicroservice}/authentication/send-otp/${email}`);
  }
  updateForgetPassword(data:any){
    return this.http.post(`${URL.AuthenticationMicroservice}/authentication/update-forget-password`,data);
  }



  //********************** CART CONTROLLER *****************************************/

  addCartData(cartData:any){
    return this.http.post(`${URL.AuthenticationMicroservice}/cart/add-cart-data`,cartData);
  }

  deleteProductFromCart(cartData:any){
    return this.http.post(`${URL.AuthenticationMicroservice}/cart/delete-product-from-cart`,cartData);
  }

  updateProductFromCart(cartData:any){
    return this.http.put(`${URL.AuthenticationMicroservice}/cart/update-product-from-cart`,cartData);
  }

  removeAllProductFromCart(userId:any){
    return this.http.delete(`${URL.AuthenticationMicroservice}/cart/clear-cart/${userId}`);
  }

  getAllProductFromCart(userId:any){
    return this.http.get(`${URL.AuthenticationMicroservice}/cart/get-all-product/${userId}`)
  }

  //********************** ORDER CONTROLLER *****************************************/

  addOrder(data:any){
    return this.http.post(`${URL.AuthenticationMicroservice}/order/add-order`,data);
  }

  addOrderProduct(data:any){
    return this.http.post(`${URL.AuthenticationMicroservice}/order/add-product`,data);
  }

  getOrder(id:any){
    return this.http.get(`${URL.AuthenticationMicroservice}/order/get-order/${id}`);
  }

  getOrderProduct(id:any){
    return this.http.get(`${URL.AuthenticationMicroservice}/order/get-order-product/${id}`);
  }





}
