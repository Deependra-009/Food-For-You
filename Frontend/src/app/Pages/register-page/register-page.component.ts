import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import UserData from 'src/app/Modals/UserData';
import { APISERVICEService } from 'src/app/Service/api-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  UserLoginData!: FormGroup;
  UserProfileData!: FormGroup

  UserData!:UserData;

  step1: boolean = true;
  step2: boolean = false;

  username = "Deependra"

  constructor(
    private mat:MatSnackBar,
    private toastr: ToastrService,
    private apiService:APISERVICEService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.UserLoginData = new FormGroup({
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", Validators.required),
      'cpassword': new FormControl("", Validators.required)

    });

    this.UserProfileData = new FormGroup({
      'fullname': new FormControl("", [Validators.required]),
      'phone_number': new FormControl("", Validators.required),
      'address': new FormControl("", Validators.required),
      'pincode': new FormControl("", Validators.required)
    })


  }

  step1Function() {
    if (this.UserLoginData.status == "VALID") { 
      this.step1 = false; 
      this.step2 = true;
      this.username=this.UserLoginData.value.email; 
    }
  }
  showSuccess() {
    this.toastr.success('Enjoy your meal', 'Registration Successfull',{
      timeOut:2000,
      progressBar:true,
      progressAnimation:'decreasing',
      
    });
  }

  submitData() {

    this.UserData={
      ...this.UserLoginData.value,
      ...this.UserProfileData.value
    }

    // console.log(this.UserData);
    // return;
    

    this.apiService.registerUserData(this.UserData).subscribe(
      (data)=>{
        this.showSuccess();
        // console.log(data);
        this.router.navigateByUrl("/login")
        
      },
      (error)=>{
        if(error.status==401){
          this.step1=true;
          this.step2=false;
          this.mat.open("E-Mail already exist!!!","ok",{
            duration:2000
          })
        }
        console.log(error);
        
      }
    )
    // console.log(this.UserData);
    
    


  }




}
