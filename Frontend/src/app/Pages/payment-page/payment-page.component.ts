import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStep } from '@angular/material/stepper';
import { Cart } from 'src/app/Modals/Cart';
import { Card } from 'src/app/Modals/Card';
import { CartServiceService } from 'src/app/Modals_Service/Cart-Service/cart-service.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import Swal from 'sweetalert2'

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { APISERVICEService } from 'src/app/Service/api-service.service';
import { DataTransferService } from './../../Service/data-transfer.service';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/Modals_Service/UserData_Service/user-data.service';

const moment = _rollupMoment || _moment;
// See the Moment.js docs for the meaning of these formats:

// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class PaymentPageComponent implements OnInit {

  date = new FormControl(moment());

  SaveCard:any=[]

  CartProducts=new Array<Cart>();

  PaymentForm!: FormGroup

  minDate=new Date;


  OrderData={
    order_user_id:"",
    order_name:"",
    order_date:"",
    order_total_price:"",
    order_payment_mode:"",
    user_id:"",
    restaurant_name:"",
    discount:""
  }

  order_product_list:any=[]

  
  

  TotalPrice=0

  panelOpenState = false;

  userID:any


  constructor(
    private cartService:CartServiceService,
    private mat:MatSnackBar,
    private api_service:APISERVICEService,
    private userService:UserDataService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.userService.getUserData().subscribe((data)=>{this.userID=data.user_id})

 
    this.PaymentForm=new FormGroup({
      'account_no':new FormControl(null,Validators.required),
      'card_holder_name':new FormControl(null,Validators.required),
      'cvv':new FormControl(null,Validators.required),
      'expiry':new FormControl(null)
    })
    // get all CartData and TotalPrice 
    this.updateCartAndTotalPrice();



  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    var inputValue = (<HTMLInputElement>document.getElementById("expirydate")).value;
    // this.expiryDate=inputValue;
    this.PaymentForm.value.expiry=inputValue;
  }

  updateCartAndTotalPrice(){
    // this.CartProducts=this.cartService.getCartData();
    this.cartService.getCartObservable()[0].subscribe((data)=>{
      this.CartProducts=data;
    })
    this.cartService.ObservableTotalPrice.subscribe((data)=>{
      this.TotalPrice=data;
    })
  }

  removeProductFronCart(productData:any){
    this.cartService.removeProductFromCart(productData);
  }

  
  PaymentFunction(){
    const date=new Date();

    this.OrderData.user_id=String(this.userID)
    this.OrderData.order_date=date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
    this.OrderData.order_total_price=this.TotalPrice+"";
    this.OrderData.order_payment_mode="Debit Card";
    this.OrderData.discount="0%";

    this.CartProducts.map((item:Cart)=>{
      this.order_product_list=[...this.order_product_list,{
        product_name:item.name,
        product_quantity:item.quantity,
        product_price:item.total_price,
        order:{
          order_id:0
        }
      }]
    })
    // console.log(this.CartProducts);

    
    

    

    this.api_service.addOrder(this.OrderData).subscribe(
      (data:any)=>{
        this.cartService.clearCart();
        // console.log(data);
        this.order_product_list.map((item:any)=>{
          item.order.order_id=data.order_id;
          this.api_service.addOrderProduct(item).subscribe((data:any)=>{
            // console.log(data);
            this.router.navigateByUrl("/order-food-online")
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Order placed Successfully',
              showConfirmButton: false,
              timer: 1500
            })
            
          })
        })
        
      }
    )




    
    
    
    
  }

  // click(){
  //   if(this.PaymentForm.status=="VALID"){
  //     this.SaveCard=[...this.SaveCard,this.PaymentForm.value]
  //   }

  //   console.log(this.SaveCard);
    

    
    
    
  // }

  addACard(){
    if(this.PaymentForm.status=="VALID"){
      this.SaveCard=[...this.SaveCard,this.PaymentForm.value]
    }
    else{
      this.mat.open("Please Fill Card Details...",'ok',{
        duration:2000
      })
    }

  }

  increase(item:any){
    this.cartService.increaseQuantity(item);


  }

  decrease(item: any) {
    if (item.quantity - 1 >= 1) {

      // decreaseQuantity
      this.cartService.decreaseQuantity(item);

      // console.log(this.CartData);
    }

  }

}
