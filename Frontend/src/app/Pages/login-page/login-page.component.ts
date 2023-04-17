import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartServiceService } from 'src/app/Modals_Service/Cart-Service/cart-service.service';
import { UserDataService } from 'src/app/Modals_Service/UserData_Service/user-data.service';
import { APISERVICEService } from 'src/app/Service/api-service.service';
import { DataTransferService } from 'src/app/Service/data-transfer.service';
import { LoginStatusService } from 'src/app/Service/login-status.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  LoginData!: FormGroup;
  ForgetLoginData!: FormGroup;
  PasswordForm!: FormGroup

  forgetPassword: boolean = false;



  steps = 1;

  constructor(
    private apiService: APISERVICEService,
    private loginStatus: LoginStatusService,
    private route: Router,
    private toastr: ToastrService,
    private userService: UserDataService
  ) { }

  ngOnInit(): void {

    this.LoginData = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });

    this.ForgetLoginData = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'userotp': new FormControl('', Validators.required),
      'systemotp': new FormControl('', Validators.required)

    });

    this.PasswordForm = new FormGroup({
      'password': new FormControl('', [Validators.required]),
      'confirmPassword': new FormControl('', [Validators.required]),

    })



  }

  showSuccess() {
    this.toastr.success('Welcome', 'Login Successfull', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',

    });
  }

  showOTPSuccess() {
    this.toastr.success('Welcome', 'OTP sent Successfully', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',

    });
  }

  showError() {
    this.toastr.error('Wrong Login Credentials', 'Login Unsuccessfull!!!', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',

    });
  }

  showOTPError() {
    this.toastr.error("", 'Wrong OTP', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',

    });
  }

  showPasswordNotMatch() {
    this.toastr.error("", 'Password and ConfirmPassword not same!!!', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',

    });
  }

  showPasswordChangeSuccessfully() {
    this.toastr.success("", 'Password Reset Seccessfully', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',

    });
  }



  submitFunction() {


    this.apiService.loginUser(this.LoginData.value).subscribe(
      (data: any) => {

        this.loginStatus.loginStatus.next(true)


        this.loginStatus.setRole(data.authority[0].authority);
        this.loginStatus.setToken(data.token);
        this.loginStatus.setEmail(data.email);


        this.userService.setUserData(true);
        this.showSuccess();
        

        setTimeout(() => {
          this.route.navigateByUrl("/");
        }, 2000);

      },
      (error) => {
        this.showError();
        console.log(error);
      }
    )
  }


  /************** forget password **** */

  step1function() {

    console.log('====================================');
    console.log(this.ForgetLoginData.value);
    console.log('====================================');


    this.apiService.getForgetPasswordData(this.ForgetLoginData.value).subscribe((data: any) => {
      if (data != null) {
        console.log(data);
        this.steps=2;
        setTimeout(()=>{
          this.apiService.sendOTP(data.email).subscribe((otpdata: any) => {
            console.log(otpdata);
            this.ForgetLoginData.controls['systemotp'].setValue(otpdata.otp)
            this.steps = 3;
            this.showOTPSuccess();
          })
        },2000)
      }
    })

  }

  step2function() {

    if (this.ForgetLoginData.value.userotp == this.ForgetLoginData.value.systemotp) {
      this.steps = 4;
    }
    else {
      this.showOTPError();
    }

  }

  step3function() {

    if (this.PasswordForm.value.password != this.PasswordForm.value.confirmPassword) {

      this.showPasswordNotMatch();
      return;
    }

    const newData = {
      ...this.PasswordForm.value,
      "email": this.ForgetLoginData.value.email
    }

    this.apiService.updateForgetPassword(newData).subscribe(
      (data) => {
        // console.log(data);
        this.showPasswordChangeSuccessfully();
        this.route.navigateByUrl("/login")
        this.forgetPassword=false;  
      },
      (error) => {
        console.log(error);

      }
    )

  }

}
