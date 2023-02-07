import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromRestaurant from './Restaurant-reducer';
import * as fromCart from './Cart-reducer';
import * as fromUser from './UserData-reducer';
import { from } from 'rxjs';

export interface RootReducerState{
    restaurant:fromRestaurant.RestaurantReducerState;
    cart:fromCart.CartReducerState,
    userData:fromUser.UserDataReducerState
}

export const rootReducer:ActionReducerMap<RootReducerState>={
    restaurant:fromRestaurant.RestaurantReducer,
    cart:fromCart.CartReducer,
    userData:fromUser.UserDataReducer
    
}
export const getCartState=(state:RootReducerState)=>state.cart;

export const getCartLoaded=createSelector(getCartState,fromCart.getLoaded);
export const getCartLoading=createSelector(getCartState,fromCart.getLoading);
export const getCartData=createSelector(getCartState,fromCart.getCartData);
export const getCartError=createSelector(getCartState,fromCart.getError);



export const getRestaurantState=(state:RootReducerState)=>state.restaurant;

export const getRestaurantLoaded=createSelector(getRestaurantState,fromRestaurant.getLoaded);
export const getRestaurantLoading=createSelector(getRestaurantState,fromRestaurant.getLoading);
export const getRestaurantData=createSelector(getRestaurantState,fromRestaurant.getRestaurantData);
export const getRestaurantError=createSelector(getRestaurantState,fromRestaurant.getError);


export const getUserState=(state:RootReducerState)=>state.userData;

export const getUserData=createSelector(getUserState,fromUser.getUserData);
export const getUserLoading=createSelector(getUserState,fromUser.getLoaded);
export const getUserLoaded=createSelector(getUserState,fromUser.getLoading);