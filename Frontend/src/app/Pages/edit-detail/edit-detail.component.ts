import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import UserData from 'src/app/Modals/UserData';
import { UserDataService } from 'src/app/Modals_Service/UserData_Service/user-data.service';
import { APISERVICEService } from 'src/app/Service/api-service.service';
import { DataTransferService } from 'src/app/Service/data-transfer.service';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {


  constructor(
    private router:Router,
    private apiService: APISERVICEService,
    private toastr: ToastrService,
    private userService: UserDataService
  ) { }

  UserData!: FormGroup

  oldUserData!: UserData

  ngOnInit(): void {

    this.UserData = new FormGroup({
      'fullname': new FormControl('', [Validators.required]),
      'email': new FormControl({ value: '', disabled: true }),
      'phone_number': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'pincode': new FormControl('', Validators.required)
    })

    this.userService.getUserData().subscribe((data) => {
      this.oldUserData = data;
      this.UserData.controls['fullname'].setValue(this.oldUserData.fullname)
      this.UserData.controls['email'].setValue(this.oldUserData.email)
      this.UserData.controls['phone_number'].setValue(this.oldUserData.phone_number)
      this.UserData.controls['address'].setValue(this.oldUserData.address)
      this.UserData.controls['pincode'].setValue(this.oldUserData.pincode)
    })




  }


  showSuccess() {
    this.toastr.success('', 'Update Successfull', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',

    });
  }

  update() {

    const newData = {
      ...this.UserData.value,
      "email": this.oldUserData.email,
    }

    this.apiService.updateUserData(newData).subscribe(
      (data) => {
        this.userService.setUserData(true);
        this.showSuccess()
        this.router.navigateByUrl("/profile-page")

      },
      (error) => {
        console.log(error);

      }
    )


  }


}
