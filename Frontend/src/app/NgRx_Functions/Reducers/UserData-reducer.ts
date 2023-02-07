
import UserData from "src/app/Modals/UserData";
import { Action } from "../Actions";
import { USER_DATA_REQUEST, USER_DATA_SUCCESS } from "../Actions/UserData-actions";

export interface UserDataReducerState{
    loading:boolean,
    loaded:boolean,
    userData:UserData
}

const initialState:UserDataReducerState={
    loading:false,
    loaded:false,
    userData:<UserData>{}
}

export function UserDataReducer(state=initialState,action:Action){
    switch(action.type){
        case USER_DATA_REQUEST:{
            return {...state,loading:true}
        }
        case USER_DATA_SUCCESS:{
            const userdata=action.payload.userdata;
            
            return {...state,loading:false,loaded:true,userData:userdata};
        }
        default:{
            return state;
        }
    }
}
export const getLoading=(state:UserDataReducerState)=>state.loading;
export const getLoaded=(state:UserDataReducerState)=>state.loaded;
export const getUserData=(state:UserDataReducerState)=>state.userData;