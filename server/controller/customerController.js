import { Customer, WaitingList, Restaurant } from "../Database/models.js";

export const signInCustomer = async (req, res) => {
    const { email, password } = req.body;
    let data = await Customer.findOne({ email: email });
    if (data) {
        let pass = data.password;
        console.log(data.password);
        if (pass === password) {
            const { email } = data;
            const newData = {
                email: email,
                authenticated: true
            }
            res.send(newData);
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
    const data = new Customer({ email, password, visited_restaurant: visited });
    const result = JSON.stringify(await data.save());
    res.send(result);
}

export const getAllRestaurants = async (req, res) => {
    const data = await Restaurant.find();
    const result = JSON.stringify(data);
    res.send(result);
}

export const insertWaitingList = async (req, res) => {
    const { rid, name } = req.body;

    console.log(name);

    const customersList = await WaitingList.findOne({ restaurant: rid });

    console.log(customersList);

    for(let d of customersList.customers)
    {
        if(d.cname===name)
        {
            res.send({message:"You have already reserved a table here"})
            return
        }
    }

    const resp = await WaitingList.updateOne(
        { _id: customersList._id },
        { $push: { customers: { cname: name } } }
    );

    if(resp)
    {
        res.send({message:"Table Reserved Successfully"});
    }
    else
    {
        res.send({message:"Error, Please retry after some time"})
    }
}

export const cancelReservation = async (req, res) => {
    const { rid, name } = req.body;
    const resp=await WaitingList.updateOne({restaurant:rid},{$pull:{customers:{
        cname:name
    }}})

    if(resp.modifiedCount==1)
    {
        res.send({message:"Reservation Cancelled Successfully"})
    }
    else
    {
        res.send({message:"You have not reserved a table here"})
    }
}