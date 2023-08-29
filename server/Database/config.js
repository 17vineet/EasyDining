const mongoose = require('mongoose');
const db='mongodb+srv://easydining:easydining2023@easydining.6caoeq2.mongodb.net/Easy-Dining';

module.exports.connectToDb=async()=>{
    await mongoose.connect(db, {
    }).then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Failed", err);
    });
}

module.exports.createSchema = async () => {
   
    const schema = new mongoose.Schema({
        username: {
            type: String,
        },
        password: {
            type: String,
        },
    });
    User = mongoose.model('user', schema);
}


module.exports.onBoardRestaurantSchema=async () => {
    await mongoose.connect(db, {
    }).then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Failed", err);
    });
    const schema = new mongoose.Schema({
        email:{
            type:String
        },
        password:{
            type:String
        },
        name:{
            type:String
        },
        location_url:{
            type:String
        },
        sitting_capacity:{
            type:Number
        },
        range:{
            type:String
        },
        thumbnail_url:{
            type:String
        }
      
       

    });
    Restaurant = mongoose.model('restaurant', schema);
}

module.exports.createCustomerSchema=async () => {
    await mongoose.connect(db, {
    }).then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Failed", err);
    });
    const schema = new mongoose.Schema({
        email:{
            type:String
        },
        password:{
            type:String
        },
        visited_restaurant:{
            type:Array
        }
      
       

    });
    Customer = mongoose.model('customer', schema);
}

module.exports.insert = async (name, pass) => {

    let data = new User({
       username:name,
       password:pass
    })
    return result = JSON.stringify(await data.save());
    // console.log(result);

};

module.exports.insertRestaurant = async (email,password,name,location_url,sitting_capacity,range,thumbnail_url) => {
    let data = new Restaurant({
       email,
       password,
       name,
       location_url,
       sitting_capacity,
       range,
       thumbnail_url
    })
    return result = JSON.stringify(await data.save());
};

module.exports.insertCustomer = async (email,password,visited_restaurant) => {
    let data = new Customer({
       email,
       password,
       visited_restaurant
    })
    return result = JSON.stringify(await data.save());
};

module.exports.insertRestaurant = async (email,password,name,location_url,sitting_capacity,range,thumbnail_url) => {
    let data = new Restaurant({
       email,
       password,
       name,
       location_url,
       sitting_capacity,
       range,
       thumbnail_url
    })
    return result = JSON.stringify(await data.save());
};

module.exports.getAllRestaurants=async()=>{
    let data=await Restaurant.find();
    let result =await JSON.stringify(data);
    return result;
}

module.exports.signInRestaurant=async(email,password)=>{
    let data=await Restaurant.findOne({email:email});
    let pass=data.password;
    console.log(data.password);
    if(pass===password){
        return {
            authenticated:true
        }
    }
    else{
        return {
            authenticated:false
        }
    }
}