import { Action } from "../Actions";
import { RESTAURANT_LIST_ERROR, RESTAURANT_LIST_REQUEST, RESTAURANT_LIST_SUCCESS } from "../Actions/Restaurant-actions";

export interface RestaurantReducerState{
    loading:boolean;
    loaded:boolean;
    restaurantData:any[];
    error:boolean;
}

const initialState:RestaurantReducerState={
    loading:false,
    loaded:false,
    restaurantData:[],
    error:false

}

export function RestaurantReducer(state=initialState,action:Action){
    switch(action.type){
        case RESTAURANT_LIST_REQUEST:{
            return {...state,loading:true}
        }

        case RESTAURANT_LIST_SUCCESS:{
            const resdata=action.payload.restaurantData;
            
            return {...state,loading:false,loaded:true,restaurantData:resdata};
        }

        case RESTAURANT_LIST_ERROR:{
            return {...state,error:true}
        }

        default:{
            return state;
        }
    }
}

// selectors

export const getLoading=(state:RestaurantReducerState)=>state.loading;
export const getLoaded=(state:RestaurantReducerState)=>state.loaded;
export const getRestaurantData=(state:RestaurantReducerState)=>state.restaurantData;
export const getError=(state:RestaurantReducerState)=>state.error;