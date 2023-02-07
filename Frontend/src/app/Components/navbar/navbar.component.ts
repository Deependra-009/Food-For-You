import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/Service/data-transfer.service';
import { LoginStatusService } from 'src/app/Service/login-status.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginStatus:boolean=false;

  constructor(
    private login_status:LoginStatusService,
    private dataTransfer:DataTransferService
  ) { }

  ngOnInit(): void {

    this.login_status.loginStatus.subscribe((data)=>{
      this.loginStatus=data;
    })

  }

  loggedout(){
    this.login_status.loggedOut()
    
  }

  check(){
    // console.log(this.dataTransfer.getUserData());
    
  }

}
