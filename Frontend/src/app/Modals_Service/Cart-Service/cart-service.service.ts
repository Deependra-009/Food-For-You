import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { CartListRemoveAction, CartListRequestAction, CartListSelectAllProductAction, CartListSelectCurrentProductAction, CartListSuccessAction, CartListUpdateDecreaseAction, CartListUpdateDeleteAction, CartListUpdateIncreaseAction } from 'src/app/NgRx_Functions/Actions/Cart-actions';
import { getCartData, RootReducerState } from 'src/app/NgRx_Functions/Reducers';
import { APISERVICEService } from 'src/app/Service/api-service.service';
import { DataTransferService } from 'src/app/Service/data-transfer.service';
import { LoginStatusService } from 'src/app/Service/login-status.service';
import { Cart } from '../../Modals/Cart';
import { UserDataService } from '../UserData_Service/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  CartData: any = new Array<Cart>();
  cartSize = new BehaviorSubject(0);

  TotalPrice = 0;

  userID=0;

  ObservableTotalPrice = new BehaviorSubject(0);

  constructor(
    private dataTransfer: DataTransferService,
    private apiService: APISERVICEService,
    private store: Store<RootReducerState>,
    private route: Router,

  ) { }

  getCartData() {
    return this.CartData;
  }

  getTotalPrice() {
    return this.TotalPrice;
  }


  getCartObservable(): [Observable<any>] {
    const cartData = this.store.select(getCartData);
    return [cartData];
  }

  updateCartSize(){
    this.getCartObservable()[0].subscribe((data:any)=>{
      
      this.cartSize.next(data.length);
    })
    
  }

  



  // ********************** add item to cart **************************//

  addProductInCart(productItem: any, restaurantId: any) {
    this.TotalPrice += Number(productItem.product_price);
    this.TotalPrice = Number(this.TotalPrice.toFixed(2));
    this.ObservableTotalPrice.next(this.TotalPrice);
    
    const new_cart_data: any = {
      product_id: productItem.product_id,
      restaurant_id: restaurantId.restaurant_id,
      name: productItem.product_name,
      description: productItem.product_description,
      tag: productItem.type,
      quantity: 1,
      original_price: Number(productItem.product_price),
      total_price: Number(productItem.product_price),
      checked: false,
      userData: {
        user_id: this.userID
        // user_id: 1
      }
    }
    this.store.dispatch(new CartListSuccessAction({ cartData: new_cart_data }));
    this.addCartInDatabase(new_cart_data);
    productItem.presentInCart = true;





  }

  // ********************** increase quantity **************************//

  increaseQuantity(productData: any) {

    this.TotalPrice += Number(productData.original_price);

    this.TotalPrice = Number(this.TotalPrice.toFixed(2));

    this.ObservableTotalPrice.next(this.TotalPrice);

    this.store.dispatch(new CartListUpdateIncreaseAction({ newCartData: productData }))
    this.updateCart(productData);

  }

  // ********************** decrease quantity **************************//

  decreaseQuantity(productData: any) {
    this.TotalPrice -= Number(productData.original_price);

    this.TotalPrice = Number(this.TotalPrice.toFixed(2));

    this.ObservableTotalPrice.next(this.TotalPrice);

    this.store.dispatch(new CartListUpdateDecreaseAction({ newCartData: productData }))

    this.updateCart(productData);


  }

  // ********************** remove item to cart **************************//

  removeProductFromCart(productData: any) {

    // return;


    this.getCartObservable()[0].pipe(
      take(1)
    ).subscribe(
      (data: any) => {
        data.map(((item: any) => {
          if (item.product_id == productData.product_id) {
            this.TotalPrice -= (Number(item.original_price) * Number(item.quantity));
            this.TotalPrice = Number(this.TotalPrice.toFixed(2));
            this.ObservableTotalPrice.next(this.TotalPrice);
            this.store.dispatch(new CartListUpdateDeleteAction({ productId: Number(productData.product_id) }));
            this.apiService.deleteProductFromCart(item).subscribe((data) => {
              // console.log(data);

            }, (error) => {
              console.log(error);

            })
          }
        }))
      }
    )


  }

  // ********************** Clear Cart **************************//

  clearCart() {

    // this.lo

    this.TotalPrice = 0;
    this.ObservableTotalPrice.next(0);
    this.store.dispatch(new CartListRemoveAction({ cartData: [] }))
    this.removeAllProduct(this.userID);
    this.cartSize.next(0);

  }

  // ********************** select current item from Cart **************************//

  selectCurrentProduct(id: any) {
    this.store.dispatch(new CartListSelectCurrentProductAction({ productId: Number(id) }));
  }


  // ********************** select all item from Cart **************************//

  selectAllItem() {

    this.store.dispatch(new CartListSelectAllProductAction({ message: "SELECT ALL ITEM" }));
  }


  // ********************** Database Function **************************//

  addCartInDatabase(cartData: any) {
    

    this.apiService.addCartData(cartData).subscribe(
      (data) => {
        // console.log(data);
      },
      (error) => {
        console.log(error);

      }
    )

  }

  updateCart(productData: any) {

    this.getCartObservable()[0].pipe(
      take(1)
    ).subscribe(
      (cartData: any) => {
        cartData.map(
          (item: any) => {
            if (item.product_id == productData.product_id) {
              // console.log(item);

              this.apiService.updateProductFromCart(item).subscribe((d) => {
                // console.log(d);
              }, (error) => {
                console.log(error);

              })
            }
          }
        )
      }
    );
  }


  removeAllProduct(userId: any) {
    this.apiService.removeAllProductFromCart(userId).subscribe((data) => {

    }, (error) => {
      // console.log(error);

    })
  }



  deleteProductFromCart(data: Cart) {

  }

  getAllProductFromCart(userId: any) {
    var sum = 0;
    this.apiService.getAllProductFromCart(userId).subscribe((data: any) => {

      data.map((item: any) => {
        this.TotalPrice += Number(item.total_price);
        this.TotalPrice = Number(this.TotalPrice.toFixed(2));
        this.ObservableTotalPrice.next(this.TotalPrice);
        this.store.dispatch(new CartListSuccessAction({ cartData: item }));
        this.updateCartSize();
      })
    },
      (error) => {
        console.log(error);

      })
  }



}
