import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Modals/Order';
import { UserDataService } from 'src/app/Modals_Service/UserData_Service/user-data.service';
import { APISERVICEService } from 'src/app/Service/api-service.service';
import { DataTransferService } from 'src/app/Service/data-transfer.service';
import { LoginStatusService } from 'src/app/Service/login-status.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  Date = new Date();

  panelOpenState = false;

  OrderData = new Array<Order>();
  OrderProductData: any = []
  UserID: any
  loading=true;
  noOrder=false;

  constructor(
    private apiservice: APISERVICEService,
    private userService: UserDataService,
    private loginStatus: LoginStatusService
  ) { }

  ngOnInit(): void {

    this.userService.getUserData().subscribe((data) => this.UserID = data.user_id)


    setTimeout(() => {
      this.apiservice.getOrder(this.UserID).subscribe((data: any) => {
        this.OrderData = data;
        console.log(this.OrderData.length);
        if(this.OrderData.length==0){
          this.noOrder=true;
        }

        
        this.OrderData.map((itemOrder: any) => {

          this.apiservice.getOrderProduct(itemOrder.order_id).subscribe((orderProduct: any) => {
            itemOrder.order_product_list = orderProduct;
            this.loading=false
            // console.log(orderProduct);

          },(error)=>{
            console.log(error);
            
          })
        })
      },(error)=>{
        console.log(error);
        
      })


    }, 2000)



  }

  multiply(a: any, b: any) {
    return Number(a) * Number(b);
  }

}
