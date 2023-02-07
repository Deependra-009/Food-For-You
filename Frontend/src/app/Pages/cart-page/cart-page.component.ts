import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Cart } from 'src/app/Modals/Cart';
import { CartServiceService } from 'src/app/Modals_Service/Cart-Service/cart-service.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  CartData:any=[]
  cartItemValue=1;

  SelectAllItem:boolean=false;

  TotalPrice=0;

  SelectCartProduct:any=[]

  noProductFound=true;

  constructor(
    private cartService:CartServiceService
  ) { }

  ngOnInit(): void {
    this.updateCartAndTotalPrice();
    if(this.CartData.length==0){
      this.noProductFound=true
    }
    else{
      this.noProductFound=false;
    }

  }

  updateCartAndTotalPrice(){
    // this.CartData=this.cartService.getCartData();
    this.cartService.getCartObservable()[0].subscribe((data)=>{
      this.CartData=data;
      
      if(this.CartData.length==0){
        this.noProductFound=true
      }
      else{
        this.noProductFound=false;
      }
    })
    this.cartService.ObservableTotalPrice.subscribe((data)=>{
      this.TotalPrice=data;
    })
  }


  increase(item:any){
    this.cartService.increaseQuantity(item);

    this.updateCartAndTotalPrice();

  }

  decrease(item: any) {
    if (item.quantity - 1 >= 1) {

      // decreaseQuantity
      this.cartService.decreaseQuantity(item);

      // get all CartData and TotalPrice 
      this.updateCartAndTotalPrice();

      // console.log(this.CartData);
    }

  }

  selectAllItem(){
    // this.SelectAllItem=!this.SelectAllItem;
    // console.log(this./SelectAllItem);
    this.SelectCartProduct=this.CartData;
    this.cartService.selectAllItem();
    
    
  }

  selectCurrentItem(item:Cart){
    // console.log(item);
    this.SelectAllItem!=this.SelectAllItem
    this.cartService.selectCurrentProduct(item.product_id);
  }

  removeCard(){
    
    this.CartData.map(
      (item:Cart)=>{
        if(item.checked){
          this.cartService.removeProductFromCart(item);
        }
      }
    )

    
  }

  check(){
    // console.log(this.CartData);
    
  }


}
