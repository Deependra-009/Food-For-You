import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/Modals_Service/Cart-Service/cart-service.service';
import { LoginStatusService } from 'src/app/Service/login-status.service';

@Component({
  selector: 'app-other-pages-navbar',
  templateUrl: './other-pages-navbar.component.html',
  styleUrls: ['./other-pages-navbar.component.css']
})
export class OtherPagesNavbarComponent implements OnInit {

  loginStatus=false;
  userName="";
  hidden=true;
  cartSize=0;

  constructor(
    private login_Status:LoginStatusService,
    private cartservice:CartServiceService
  ) { }

  ngOnInit(): void {

    this.cartservice.cartSize.subscribe((data)=>{
      if(data!=0){
        this.cartSize=data;
        this.hidden=false;
      }
      else{
        this.cartSize=0;
        this.hidden=true;
      }
    })

    this.login_Status.loginStatus.subscribe((data)=>{
      this.loginStatus=data;
    })
    this.login_Status.userName.subscribe((data)=>{
      this.userName=data;
    })
  }

  logout(){
    this.login_Status.loggedOut();
  }

}
