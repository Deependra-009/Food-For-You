export const RESTAURANT_LIST_REQUEST="restaurant list request";
export const RESTAURANT_LIST_SUCCESS="restaurant list success";
export const RESTAURANT_LIST_ERROR="restaurant list error";

export class RestaurantListRequestAction{
    readonly type=RESTAURANT_LIST_REQUEST;
}

export class RestaurantListSuccessAction{
    readonly type=RESTAURANT_LIST_SUCCESS;

    constructor(public payload?:{restaurantData:[]}){

    }
}

export class RestaurantListErrorAction{
    readonly type=RESTAURANT_LIST_ERROR;
}