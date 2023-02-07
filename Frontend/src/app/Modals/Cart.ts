export interface Cart{
    product_cart_id:Number
    product_id:Number,
    restaurant_id:Number,
    restaurant_name:String,
    product_type:String,
    name:String,
    description:String,
    tag:String,
    quantity:Number,
    original_price:Number,
    total_price:Number,
    checked:Boolean,
    userData:{
        user_id:Number
    }
}