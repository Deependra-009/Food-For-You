import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toArray } from 'rxjs';
import { browserRefresh } from 'src/app/app.component';
import { Product } from 'src/app/Modals/Product';
import { Restaurant } from 'src/app/Modals/Restaurant';
import { CartServiceService } from 'src/app/Modals_Service/Cart-Service/cart-service.service';
import { DataTransferService } from 'src/app/Service/data-transfer.service';
import { LoginStatusService } from 'src/app/Service/login-status.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('data') data!: ElementRef;

  cartItemPresent: boolean = false;
  TotalPrice = 0;


  isLoggedIn = false;

  // idScroll=0;
  scroll: boolean = false;

  TagsData: any = []

  ProductsData: any = []
  RestaurantData!: Restaurant;

  CartData: any = []

  isPageRefresh = false;






  constructor(
    private dataTransfer: DataTransferService,
    private cartService: CartServiceService,
    private loginStatus: LoginStatusService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.isPageRefresh = browserRefresh.valueOf();

    if (this.isPageRefresh) {
      this.router.navigateByUrl("/order-food-online")
    }



    const tags = new Set();

    this.updateCartAndTotalPrice();

    // get restaurant data
    this.RestaurantData = this.dataTransfer.getParticularRestaurantData();

    // get products of restaurant
    this.ProductsData = this.dataTransfer.getParticularRestaurantProducts();

    this.ProductsData.map(
      (item: Product) => {
        for (var cartItem of this.CartData) {
          if (cartItem.product_id == item.product_id) {
            item.presentInCart = true;
          }
        }
      }
    )


    this.loginStatus.loginStatus.subscribe((data) => {
      this.isLoggedIn = data;
    })


    this.ProductsData.map((data: any) => {
      tags.add(data.category)
    })

    this.TagsData = Array.from(tags);

    if (this.CartData.length != 0) {
      this.cartItemPresent = true;
    }




  }

  ngAfterViewInit(): void {
    this.updateCartAndTotalPrice();
  }

  updateCartAndTotalPrice() {
    // this.CartData=this.cartService.getCartData();

    this.cartService.getCartObservable()[0].subscribe((data) => {
      this.CartData = data;
    })

    this.cartService.ObservableTotalPrice.subscribe((data) => {
      this.TotalPrice = data;
    })
  }



  // ********************** Go To Card **************************//

  goToCard(id: any) {
    const data = document.getElementById(id);
    data?.scrollIntoView();

  }

  // ********************** increase quantity **************************//

  increase(item: any) {

    // increaseQuantity
    this.cartService.increaseQuantity(item);

    // get all CartData and TotalPrice 
    // this.updateCartAndTotalPrice();

    // console.log(this.CartData);

    this.cartService.ObservableTotalPrice.subscribe((data) => {
      // console.log("=>",data);

    })


  }

  // ********************** decrease quantity **************************//

  decrease(item: any) {
    if (item.quantity - 1 >= 1) {

      // decreaseQuantity
      this.cartService.decreaseQuantity(item);

      // get all CartData and TotalPrice 
      // this.updateCartAndTotalPrice();

      console.log(this.CartData);
    }

  }

  // ********************** add item to cart **************************//

  showSuccess() {
    this.toastr.success('', 'Add Successfull in cart', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',

    });
  }

  showSuccessError() {
    this.toastr.success('', 'Remove product from cart', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',

    });
  }

  showSuccessRemoveAllProductError() {
    this.toastr.success('', 'All Product remove from cart', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',

    });
  }

  addItem(item: any) {

    if (this.isLoggedIn == false) {
      this.router.navigateByUrl("/login")
      return;
    }

    this.showSuccess();



    this.cartItemPresent = true;

    item.presentInCart = true;


    // update cart
    this.cartService.addProductInCart(item, this.RestaurantData);




  }

  // ********************** remove item to cart **************************//

  removeItem(item: any) {
    this.showSuccessError();
    item.presentInCart = false;

    // update Cart
    this.cartService.removeProductFromCart(item);

    // get all CartData and TotalPrice 
    // this.updateCartAndTotalPrice();

  }

  // ********************** Clear Cart **************************//

  clearCart() {
    this.cartItemPresent = false;
    this.showSuccessRemoveAllProductError();
    this.ProductsData.map((data: any) => data.presentInCart = false)

    // update Cart
    this.cartService.clearCart();
  }


}
