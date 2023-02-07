import { Component, OnInit } from '@angular/core';
import UserData from 'src/app/Modals/UserData';
import { UserDataService } from 'src/app/Modals_Service/UserData_Service/user-data.service';
import { DataTransferService } from 'src/app/Service/data-transfer.service';
import { LoginStatusService } from 'src/app/Service/login-status.service';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.css']
})
export class MyDetailsComponent implements OnInit {

  constructor(
    private userService:UserDataService
  ) { }

  UserData!:UserData;

  ngOnInit(): void {

    this.userService.getUserData().subscribe((data)=>{
      this.UserData=data;
      
    })

  }

}
