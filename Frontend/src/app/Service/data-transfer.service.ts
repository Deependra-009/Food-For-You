import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import UserData from '../Modals/UserData';
import { LoginStatusService } from './login-status.service';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {



  //**********  get products of particualar products *************//
  
  ParticularRestaurantProducts:any=[]
  ParticularRestaurantData:any;

  getParticularRestaurantProducts(){
    return this.ParticularRestaurantProducts;
  }

  setParticularRestaurantProducts(data:any){

    this.ParticularRestaurantProducts=data;
  }

  getParticularRestaurantData(){
    return this.ParticularRestaurantData;
  }

  setParticularRestaurantData(data:any){
    this.ParticularRestaurantData=data;
  }


  //**********  ProductData *************//

  ProductData={
    name:""
  }

  getProductData(){
    return this.ProductData;
  }

  setProductData(data:any){
    this.ProductData=data;
  }

 


  constructor(
  ) { }
}
