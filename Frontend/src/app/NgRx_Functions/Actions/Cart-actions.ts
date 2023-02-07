import { Cart } from "src/app/Modals/Cart";

export const CART_LIST_REQUEST="cart list request";
export const CART_LIST_SUCCESS="cart list success";
export const CART_LIST_ERROR="cart list error";
export const CART_LIST_UPDATE_INCREASE="cart list update increase";
export const CART_LIST_UPDATE_DECREASE="cart list update decrease";
export const CART_LIST_UPDATE_DELETE="cart list update delete";
export const CART_REMOVE_ALL_PRODUCT="cart remove all product";
export const CART_SELECT_ALL_PRODUCT="cart select all product";
export const CART_SELECT_CURRENT_PRODUCT="cart select current product";

export class CartListRequestAction{
    readonly type=CART_LIST_REQUEST;
}

export class CartListUpdateIncreaseAction{
    readonly type=CART_LIST_UPDATE_INCREASE;

    constructor(public payload?:{newCartData:Cart}){

    }
}
export class CartListSelectCurrentProductAction{
    readonly type=CART_SELECT_CURRENT_PRODUCT;

    constructor(public payload?:{productId:Number}){

    }
}
export class CartListSelectAllProductAction{
    readonly type=CART_SELECT_ALL_PRODUCT;

    constructor(public payload?:{message:String}){

    }
}
export class CartListUpdateDeleteAction{
    readonly type=CART_LIST_UPDATE_DELETE;

    constructor(public payload?:{productId:Number}){

    }
}

export class CartListUpdateDecreaseAction{
    readonly type=CART_LIST_UPDATE_DECREASE;

    constructor(public payload?:{newCartData:Cart}){

    }
}

export class CartListRemoveAction{
    readonly type=CART_REMOVE_ALL_PRODUCT;

    constructor(public payload?:{cartData:Cart[]}){

    }
}

export class CartListSuccessAction{
    readonly type=CART_LIST_SUCCESS;

    constructor(public payload?:{cartData:Cart[]}){

    }
}

export class CartListErrorAction{
    readonly type=CART_LIST_ERROR;
}