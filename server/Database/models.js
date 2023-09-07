import { Schema, model } from 'mongoose' ;

const restaurantSchema = new Schema({
    email: {
        type: String
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
    }
});

const customerSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    visited_restaurant: {
        type: Array
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
    restaurant:{
        type:String
    },
    customers:{
        type:Array
    }
}) ;

export const Restaurant = model('restaurant', restaurantSchema) ;

export const Customer = model('customer', customerSchema);

export const WaitingList = model('waiting', waitingListSchema);

export const DiningList = model('dining', diningListSchema);


