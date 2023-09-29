import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema({
    email: {
        type: String,
        // unique: true,
        // index:true
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    location_url: {
        type: String
    },
    sitting_capacity: {
        type: Number
    },
    range: {
        type: String
    },
    thumbnail_url: {
        type: String
    },
    images_urls: {
        type: Array
    },
    refresh_token: {
        type: String
    },
    total_tables:{
        type:Object
    },
    available_tables:{
        type:Object
    },
    phone:{
        type:Number
    }
});

const customerSchema = new Schema({
    name:{
        type:String
    },
    email: {
        type: String,
        // unique:true,
        // index:true
    },
    password: {
        type: String
    },
    visited_restaurant: {
        type: Array
    },
    refresh_token: {
        type: String
    },
    phone:{
        type:Number
    }
});

const waitingListSchema = new Schema({
    restaurant: {
        type: String
    },
    customers: {
        type: Array
    }
})

const diningListSchema = new Schema({
    restaurant: {
        type: String
    },
    customers: {
        type: Array
    }
});

const menuSchema = new Schema({
    restaurant: {
        type: String
    },
    menu: {
        type: Array
    }
});

const billSchema = new Schema({
    restaurant_id: {
        type: String
    },
    customer_id: {
        type: Array
    },
    items_ordered:{
        type:Array
    },
    bill_amt:{
        type:Number
    }
});

export const Restaurant = model('restaurant', restaurantSchema);

export const Customer = model('customer', customerSchema);

export const WaitingList = model('waiting', waitingListSchema);

export const DiningList = model('dining', diningListSchema);

export const Menu = model('menu', menuSchema)

export const Bill = model('bill',billSchema)
