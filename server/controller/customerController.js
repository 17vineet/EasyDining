import jwt from "jsonwebtoken";

import { Customer, WaitingList, Restaurant } from "../Database/models.js";

export const signInCustomer = async (req, res) => {
    const { email, password } = req.body;
    let data = await Customer.findOne({ email: email });
    if (data) {
        let pass = data.password;
        if (pass === password) {

            delete data._doc.password
            delete data._doc.refresh_token

            // creating JWT
            const accessToken = jwt.sign({ ...data._doc, userType: 'customer' }, 'test', { expiresIn: '30s' });
            const refreshToken = jwt.sign({ ...data._doc, userType: 'customer' }, 'test', { expiresIn: '1d' });

            // saving the refreshToken with the current user in DB
            await Customer.findByIdAndUpdate(data._id, { ...data._doc, refresh_token: refreshToken }, { new: true })

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).send({ accessToken });
        }
        else {
            res.status(401).send('Invalid Credentials');
        }
    }
    else {
        res.status(404).send('User account not found')
    }
}

export const signUpCustomer = async (req, res) => {
    const { name, email, password, visited, phone } = req.body;
    const data = new Customer({ name, email, password, visited_restaurant: visited, phone, refresh_token: "" });
    const result = await data.save();

    delete result._doc.password;
    delete result._doc.refresh_token;

    // creating JWT
    const accessToken = jwt.sign({ ...result._doc, userType: 'customer' }, 'test', { expiresIn: '30s' });
    const refreshToken = jwt.sign({ ...result._doc, userType: 'customer' }, 'test', { expiresIn: '1d' });

    // saving the refreshToken with the current user in DB
    await Customer.findByIdAndUpdate(result._id, { ...result._doc, refresh_token: refreshToken }, { new: true })

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).send({ accessToken });
}

export const getAllRestaurants = async (req, res) => {
    const data = await Restaurant.find();
    const result = JSON.stringify(data);
    res.send(result);
}

export const insertWaitingList = async (req, res) => {
    const { rid, name, email, phone } = req.body;

    const customersList = await WaitingList.findOne({ restaurant: rid });

    for (let d of customersList.customers) {
        if (d.cname === name) {
            res.send({ message: "You have already reserved a table here" })
            return
        }
    }

    const resp = await WaitingList.updateOne(
        { _id: customersList._id },
        { $push: { customers: { cname: name, phone, email } } }
    );

    if (resp) {
        res.send({ message: "Table Reserved Successfully" });
    }
    else {
        res.send({ message: "Error, Please retry after some time" })
    }
}

export const cancelReservation = async (req, res) => {
    const { rid, email } = req.body;
    const resp = await WaitingList.updateOne({ restaurant: rid }, {
        $pull: {
            customers: {
                'email': email
            }
        }
    })

    if (resp.modifiedCount == 1) {
        res.send({ message: "Reservation Cancelled Successfully" })
    }
    else {
        res.send({ message: "You have not reserved a table here" })
    }
}

export const updateCustomerDetails = async (req, res) => {
    const { _id, name, email, password, phone } = req.body;
    const resp = await Customer.updateOne({ '_id': _id, 'password': password }, {
        $set: {
            'name': name,
            'email': email,
            'phone': phone,
        }
    })

    if (resp.modifiedCount == 1) {
        res.send({ message: "Data updated successfully" })
    }
    else {
        res.send({ message: "Could not update the details due to wrong password" })
    }
}

export const updateCustomerPassword = async (req, res) => {
    const { _id, opass, npass } = req.body;
    const resp = await Customer.updateOne({ '_id': _id, 'password': opass }, {
        $set: {
            'password': npass
        }
    })

    if (resp.modifiedCount == 1) {
        res.send({ message: "Password Updated Successfully" })
    }
    else {
        res.send({ message: "Incorrect Old Password" })
    }
}