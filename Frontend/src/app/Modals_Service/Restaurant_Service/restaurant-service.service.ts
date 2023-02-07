import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, take } from 'rxjs';
import { RestaurantListErrorAction, RestaurantListRequestAction, RestaurantListSuccessAction } from 'src/app/NgRx_Functions/Actions/Restaurant-actions';
import { getRestaurantData, getRestaurantError, getRestaurantLoaded, getRestaurantLoading, RootReducerState } from 'src/app/NgRx_Functions/Reducers';
import { APISERVICEService } from 'src/app/Service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {

  constructor(
    private apiService: APISERVICEService,
    private store: Store<RootReducerState>
  ) { }

  getRestaurantObservable():[Observable<any>,Observable<Boolean>,Observable<Boolean>]{
    const loading$ = this.store.select(getRestaurantLoading);
    const loaded$ = this.store.select(getRestaurantLoaded);
    const restaurantData = this.store.select(getRestaurantData);


    return [restaurantData,loading$,loaded$];

  }

  getRestaurantData(force = false) {
    const loading$ = this.store.select(getRestaurantLoading);
    const loaded$ = this.store.select(getRestaurantLoaded);
    const restaurantData = this.store.select(getRestaurantData);
    const error$ = this.store.select(getRestaurantError);
    
    combineLatest([loading$, loaded$]).pipe(
      take(1),
    ).subscribe((data) => {

      if (!data[0] && !data[1] || force) {
        this.store.dispatch(new RestaurantListRequestAction())
        this.apiService.getAllRestaurant().subscribe(
          (res: any) => {
            // console.log(res);
            this.store.dispatch(new RestaurantListSuccessAction({ restaurantData: res }))

          },
          (error) => {
            console.log(error);

            this.store.dispatch(new RestaurantListErrorAction());
          }
        )
      }
    })


  }

}
