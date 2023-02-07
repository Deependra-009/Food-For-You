import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, take } from 'rxjs';
import UserData from 'src/app/Modals/UserData';
import { UserDataRequestAction, UserDataSuccessAction } from 'src/app/NgRx_Functions/Actions/UserData-actions';
import { getUserData, getUserLoaded, getUserLoading, RootReducerState } from 'src/app/NgRx_Functions/Reducers';
import { APISERVICEService } from 'src/app/Service/api-service.service';
import { LoginStatusService } from 'src/app/Service/login-status.service';
import { CartServiceService } from '../Cart-Service/cart-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {


  constructor(
    private store: Store<RootReducerState>,
    private apiService: APISERVICEService,
    private loginStatus: LoginStatusService,
    private cartService:CartServiceService
  ) { }

  getUserData() {
    const userData = this.store.select(getUserData);
    return userData;

  }


  setUserData(force = false) {

    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);

    combineLatest([loading$, loaded$]).pipe(
      take(1),
    ).subscribe((data) => {

      if (!data[0] && !data[1] || force) {
        this.store.dispatch(new UserDataRequestAction())
        const email = this.loginStatus.getEmail();
        if (email != null) {
          this.apiService.getUserData(email).subscribe((data: any) => {
            this.cartService.userID=data.user_id;
            this.store.dispatch(new UserDataSuccessAction({ userdata: data }));
            this.loginStatus.updateUserData(data);
            this.cartService.updateCartSize();
            
           
            
          }, (error) => {
            console.log(error);

          })
        }
      }
    })

  }

}
