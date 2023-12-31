import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema({
    email: {
        type: String,
        unique: true,
        index: true
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
    total_tables: {
        type: Object
    },
    occupied_tables: {
        type: Object
    },
    phone: {
        type: Number,
        unique: true,
        index: true
    },
    city: {
        type: String
    },
    rating: {
        type: Number
    },
    ratingCount: {
        type: Number
    },
    accepting: {
        type: Boolean
    },
    opening_time:{
        type:String
    },
    closing_time:{
        type:String
    },
    average_time:{
        type:Number
    },
    dineCount:{
        type:Number
    }

});

const customerSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        index: true
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
    phone: {
        type: Number,
        unique: true,
        index: true
    },
    last_city: {
        type: String
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
    restaurant_name: {
        type: String
    },
    rid: {
        type: String
    },
    customer: {
        type: Number
    },
    orderId: {
        type: String
    },
    bill: {
        type: Array
    },
    billAmt: {
        type: Number
    },
    billDate: {
        type: String
    },
    billTime: {
        type: String
    }
});

const CuisineSchema = new Schema({
    name: {
        type: String
    },
    items: {
        type: Array
    }
});

const OrderSchema = new Schema({
    'restaurant': {
        type: String
    },
    'customer': {
        type: String
    },
    'order': {
        type: Array
    }
})

const ItemSchema = new Schema({
    'name':{
        type:String
    }
})


export const Restaurant = model('restaurant', restaurantSchema);

export const Customer = model('customer', customerSchema);

export const WaitingList = model('waiting', waitingListSchema);

export const DiningList = model('dining', diningListSchema);

export const Menu = model('menu', menuSchema)

export const Bill = model('bill', billSchema)

export const Cuisine = model('cuisine', CuisineSchema)

export const Order = model('order', OrderSchema)