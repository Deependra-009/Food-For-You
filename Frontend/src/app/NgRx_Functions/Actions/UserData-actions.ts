import UserData from "src/app/Modals/UserData";

export const USER_DATA_REQUEST="request user data";
export const USER_DATA_SUCCESS="success user data";

export class UserDataRequestAction{
    readonly type=USER_DATA_REQUEST;
}

export class UserDataSuccessAction{
    readonly type=USER_DATA_SUCCESS;

    constructor(public payload?:{userdata:UserData}){

    }
}
