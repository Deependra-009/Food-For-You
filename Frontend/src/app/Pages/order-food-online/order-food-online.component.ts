import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CartServiceService } from 'src/app/Modals_Service/Cart-Service/cart-service.service';
import { RestaurantServiceService } from 'src/app/Modals_Service/Restaurant_Service/restaurant-service.service';
import { APISERVICEService } from 'src/app/Service/api-service.service';
import { DataTransferService } from 'src/app/Service/data-transfer.service';

@Component({
  selector: 'app-order-food-online',
  templateUrl: './order-food-online.component.html',
  styleUrls: ['./order-food-online.component.css']
})
export class OrderFoodOnlineComponent implements OnInit {

  Data:any=[]

  Inspiration_Your_First_Order_Data=[
    {
      source:"https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png",
      name:"Biryani"
    },
    {
      source:"https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png",
      name:"Rolls"
    },
    {
      source:"https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png",
      name:"Pizza"
    },
    {
      source:"https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png",
      name:"Thali"
    },
    {
      source:"https://b.zmtcdn.com/data/o2_assets/2b5a5b533473aada22015966f668e30e1633434990.png",
      name:"Paratha"
    },
    {
      source:"https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
      name:"Burger"
    },
    {
      source:"https://b.zmtcdn.com/data/dish_images/91c554bcbbab049353a8808fc970e3b31615960315.png",
      name:"Noodles"
    },
    {
      source:"https://b.zmtcdn.com/data/dish_images/1437bc204cb5c892cb22d78b4347f4651634827140.png",
      name:"Chaat"
    },
    {
      source:"https://b.zmtcdn.com/data/o2_assets/5dbdb72a48cf3192830232f6853735301632716604.png",
      name:"Momos"
    },
    {
      source:"https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png",
      name:"Dosa"
    }
  ]

  constructor(
    private dataTransfer:DataTransferService,
    private route:Router,
    private apiService:APISERVICEService,
    private restaurantService:RestaurantServiceService
  ) { }

  ngOnInit(): void {

    
    this.restaurantService.getRestaurantData();
    const observer$=this.restaurantService.getRestaurantObservable();
 
    
    observer$[0].subscribe((data)=>{
      this.Data=data;
      
    })
    
    

  }



  ClickOrder(resdata:any){

    this.apiService.getParticularRestaurantProducts(resdata.restaurant_id).subscribe(
      (data)=>{
        this.dataTransfer.setParticularRestaurantData(resdata);
        this.dataTransfer.setParticularRestaurantProducts(data);
        this.route.navigateByUrl("/product-details");
      },
      (error)=>{
        console.log(error);
        
      }

    )
   
    this.dataTransfer.setProductData({
      name:resdata.name
    })

    

  }

  sortByRelevance(){
    this.Data=this.Data.slice().sort((a:any,b:any)=>Number(a.restaurant_id)-Number(b.restaurant_id));
  }

  sortByDelieveryTime(){
    // this.Data=this.Data.slice().sort((a:any,b:any)=>Number(a.))
    this.Data=this.Data.slice().sort((a:any,b:any)=>Number(a.restaurant_delievery_time.slice(0,3))-Number(b.restaurant_delievery_time.slice(0,3)));
    
  }

  sortByRating(){
    this.Data=this.Data.slice().sort((a:any,b:any)=>Number(a.restaurant_review)-Number(b.restaurant_review))
  }

}
