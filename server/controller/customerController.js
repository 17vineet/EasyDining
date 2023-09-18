import jwt from "jsonwebtoken";

import { Customer, WaitingList, Restaurant } from "../Database/models.js";

export const signInCustomer = async (req, res) => {
    const { email, password } = req.body;
    let data = await Customer.findOne({ email: email });
    if (data) {
        let pass = data.password;
        if (pass === password) {

            // creating JWT
            const accessToken = jwt.sign({ email: data.email, userType : 'customer' }, 'test', {expiresIn : '30s'}) ; 
            const refreshToken = jwt.sign({ email: data.email, userType : 'customer' }, 'test', {expiresIn : '1d'}) ; 

            // saving the refreshToken with the current user in DB
            await Customer.findByIdAndUpdate(data._id, { ...data._doc, refresh_token: refreshToken}, {new : true})

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge : 24 * 60 * 60 * 1000 }) ;
            res.send({accessToken, authenticated : true});
        }
        else {
            res.send({ authenticated: false, message: "Invalid Credentials" });
        }
    }
    else {
        res.send({ authenticated: false, message: "User account not found" })
    }
}

export const signUpCustomer = async (req, res) => {
    const { email, password, visited } = req.body;
    const data = new Customer({ email, password, visited_restaurant: visited, refresh_token: "" });
    const result = await data.save();

    const newData = {email : result.email, visited : result.visited_restaurant, userType : 'customer'} ;

    // creating JWT
    const accessToken = jwt.sign(newData, 'test', {expiresIn : '30s'}) ;
    const refreshToken = jwt.sign(newData, 'test', {expiresIn : '1d'}) ;

    // saving the refreshToken with the current user in DB
    await Customer.findByIdAndUpdate(result._id, { ...result._doc, refresh_token: refreshToken}, {new : true})

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge : 24 * 60 * 60 * 1000 }) ;
    res.send(accessToken);
}

export const getAllRestaurants = async (req, res) => {
    const data = await Restaurant.find();
    const result = JSON.stringify(data);
    res.send(result);
}

export const insertWaitingList = async (req, res) => {
    const { rid, name } = req.body;

    const customersList = await WaitingList.findOne({ restaurant: rid });

    for(let d of customersList.customers){
        if(d.cname===name){
            res.send({message:"You have already reserved a table here"})
            return
        }
    }

    const resp = await WaitingList.updateOne(
        { _id: customersList._id },
        { $push: { customers: { cname: name } } }
    );

    if(resp){
        res.send({message:"Table Reserved Successfully"});
    }
    else{
        res.send({message:"Error, Please retry after some time"})
    }
}

export const cancelReservation = async (req, res) => {
    const { rid, name } = req.body;
    const resp=await WaitingList.updateOne({restaurant:rid},{$pull:{customers:{
        cname:name
    }}})

    if(resp.modifiedCount==1){
        res.send({message:"Reservation Cancelled Successfully"})
    }
    else{
        res.send({message:"You have not reserved a table here"})
    }
}