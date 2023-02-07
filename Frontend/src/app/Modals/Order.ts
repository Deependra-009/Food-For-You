import { OrderProduct } from "./OrderProduct";

export interface Order{
    order_id:Number,
    order_user_id:String,
    order_name:String,
    order_date:String,
    order_total_price:String,
    order_payment_mode:String,
    user_id:String,
    restaurant_name:String,
    discount:String,
    order_product_list:Array<OrderProduct>
}