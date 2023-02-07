import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import UserData from 'src/app/Modals/UserData';
import { UserDataService } from 'src/app/Modals_Service/UserData_Service/user-data.service';
import { APISERVICEService } from 'src/app/Service/api-service.service';
import { DataTransferService } from 'src/app/Service/data-transfer.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private dataTransfer: DataTransferService,
    private apiService: APISERVICEService,
    private router:Router,
    private userService:UserDataService
  ) { }

  PasswordForm!: FormGroup
  UserData!: UserData

  ngOnInit(): void {

    this.userService.getUserData().subscribe((data)=>{this.UserData=data})

    this.PasswordForm = new FormGroup({
      'password': new FormControl('', [Validators.required]),
      'confirmPassword': new FormControl('', [Validators.required]),

    })


  }

  changePassword() {

    const newData = {
      ...this.PasswordForm.value,
      "email": this.UserData.email
    }
    this.apiService.updatePassword(newData).subscribe((data) => {
      this.router.navigateByUrl("/profile-page")
    }, (error) => {
      console.log(error);

    })

  }

}
