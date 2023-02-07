import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CartServiceService } from './Modals_Service/Cart-Service/cart-service.service';
import { UserDataService } from './Modals_Service/UserData_Service/user-data.service';
import { DataTransferService } from './Service/data-transfer.service';
import { LoginStatusService } from './Service/login-status.service';

export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Food For You';

  subscription: Subscription;

  constructor(
    private userService:UserDataService,
    private router: Router
  ) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
  });

  }

  ngOnInit(): void {
    
    this.userService.setUserData(true);



  }





}

