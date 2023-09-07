import { Customer, WaitingList, Restaurant } from "../Database/models.js";

export const signInCustomer = async (req, res)=> {
    const { email,password } = req.body;
    let data = await Customer.findOne({ email: email });
    let pass = data.password;
    console.log(data.password);
    if (pass === password) {
        const { email } = data;
        const newData = {
            email: email,
            authenticated: true
        }
        res.send(newData) ;
    }
    else {
        res.send({authenticated: false}) ;
    }
}

export const signUpCustomer = async (req, res)=>{
    const { email, password, visited} = req.body ;
    const data = new Customer({ email, password, visited_restaurant: visited}) ;
    result = JSON.stringify(await data.save());
    res.send(result) ;
}

export const getAllRestaurants = async (req, res)=> {
    const data = await Restaurant.find();
    const result = JSON.stringify(data);
    res.send(result);
}

export const insertWaitingList = async (req, res)=>{
    const { rid, name } = req.body ;
    
    console.log(name);

    const customersList = await WaitingList.findOne({ restaurant: rid });

    console.log(customersList);

    const resp = await WaitingList.updateOne(
        { _id: customersList._id },
        { $push: { customers: { cname: name } } }
    );

    res.send(resp) ;
}