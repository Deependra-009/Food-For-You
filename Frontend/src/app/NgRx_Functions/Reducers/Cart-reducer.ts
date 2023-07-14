import { from } from "rxjs";
import { Cart } from "src/app/Modals/Cart";
import { Action } from "../Actions";
import { CART_LIST_ERROR, CART_LIST_REQUEST, CART_LIST_SUCCESS, CART_LIST_UPDATE_DECREASE, CART_LIST_UPDATE_DELETE, CART_LIST_UPDATE_INCREASE, CART_REMOVE_ALL_PRODUCT, CART_SELECT_ALL_PRODUCT, CART_SELECT_CURRENT_PRODUCT } from "../Actions/Cart-actions";

export interface CartReducerState {
    loading: boolean;
    loaded: boolean;
    cartData: Cart[];
    error: boolean;
}

const initialState: CartReducerState = {
    loading: false,
    loaded: false,
    cartData: [],
    error: false

}

export function CartReducer(state = initialState, action: Action) {
    switch (action.type) {
        case CART_LIST_REQUEST: {

            return { ...state, loading: true }
        }

        case CART_LIST_SUCCESS: {
            const resdata = action.payload.cartData;
            const newData = [...state.cartData, resdata];

            return { ...state, loading: false, loaded: true, cartData: newData };
        }

        case CART_SELECT_ALL_PRODUCT: {

            const oldCartData = state.cartData;
            var newCartData: any = [];

            oldCartData.map(
                (item: Cart) => {
                    var newItem = JSON.parse(JSON.stringify(item));
                    newItem.checked = !newItem.checked;
                    newCartData = [...newCartData, newItem]
                }
            )
            console.log(newCartData);



            return { ...state, cartData: newCartData };
        }
        case CART_SELECT_CURRENT_PRODUCT: {

            const productId = action.payload.productId;
            var itemIndex = 0;
            var item: any = {};
            const updateCartData = state.cartData.map((i: Cart, index) => {
                if (i.product_id == productId) {
                    item = i;
                    itemIndex = index;
                }
                return i;
            })
            item = JSON.parse(JSON.stringify(item));
            item.checked = !item.checked;
            // console.log(item);
            
            const b = updateCartData.splice(itemIndex + 1);
            const a = updateCartData.splice(0, itemIndex);
            const newCartData = [
                ...a,
                item,
                ...b
            ]
            return { ...state, cartData: newCartData }


        }

        case CART_LIST_UPDATE_INCREASE: {
            const productData = action.payload.newCartData;

            var itemIndex = 0;
            var item: any = {};
            const updateCartData = state.cartData.map((i: Cart, index) => {
                if (i.product_id == productData.product_id) {
                    item = i;
                    itemIndex = index;
                }
                return i;
            })


            item = JSON.parse(JSON.stringify(item));

            item.quantity = Number(item.quantity) + 1;
            item.total_price = Number(item.quantity) * Number(item.original_price);

            const b = updateCartData.splice(itemIndex + 1);
            const a = updateCartData.splice(0, itemIndex);

            const newCartData = [
                ...a,
                item,
                ...b
            ]

            return { ...state, cartData: newCartData }
        }
        case CART_LIST_UPDATE_DECREASE: {
            const productData = action.payload.newCartData;
            var itemIndex = 0;
            var item: any = {};
            const updateCartData = state.cartData.map((i: Cart, index) => {
                if (i.product_id == productData.product_id) {
                    item = i;
                    itemIndex = index;
                }
                return i;
            })
            item = JSON.parse(JSON.stringify(item));
            item.quantity = Number(item.quantity) - 1;
            item.total_price = Number(item.quantity) * Number(item.original_price);
            const b = updateCartData.splice(itemIndex + 1);
            const a = updateCartData.splice(0, itemIndex);
            const newCartData = [
                ...a,
                item,
                ...b
            ]
            return { ...state, cartData: newCartData }
        }

        case CART_LIST_UPDATE_DELETE: {
            var item: any = {}
            const newCart = state.cartData.filter((data: Cart) => (data.product_id != action.payload.productId));
            return { ...state, cartData: newCart };
        }

        case CART_REMOVE_ALL_PRODUCT: {
            return { ...state, cartData: [] }
        }

        case CART_LIST_ERROR: {
            return { ...state, error: true }
        }

        default: {
            return state;
        }
    }
}

// selectors

export const getLoading = (state: CartReducerState) => state.loading;
export const getLoaded = (state: CartReducerState) => state.loaded;
export const getCartData = (state: CartReducerState) => state.cartData;
export const getError = (state: CartReducerState) => state.error;