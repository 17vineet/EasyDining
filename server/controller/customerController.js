import jwt from "jsonwebtoken";

import { Customer, WaitingList, Restaurant, DiningList, Bill } from "../Database/models.js";


function containsOnlyNumbers(inputStr) {
    return /^[0-9]+$/.test(inputStr);
}

export const signInCustomer = async (req, res) => {
    let data = null;
    const { emailpass, password } = req.body;
    if (containsOnlyNumbers(emailpass)) {
        data = await Customer.findOne({ 'phone': emailpass })
    }
    else {
        data = await Customer.findOne({ 'email': emailpass })
    }
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
    try {
        // const data = new Customer({ name, email, password, visited_restaurant:visited, phone, refresh_token: "" });
        const data = new Customer({ ...req.body, 'last_city': null });
        var result = await data.save();
    }
    catch (e) {
        if (e.keyValue.email != undefined) {
            res.status(409).send(`An account already exists corresponding to this email id`)
            return
        }
        else {
            res.status(409).send(`An account already exists corresponding to this phone number`)
            return
        }
    }

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
    const { city } = req.body;
    console.log(city);
    let data = null;
    if (city != "null") {
        data = await Restaurant.find({ 'city': city });
        console.log(data)
    }
    else {
        data = await Restaurant.find({});
    }
    const result = JSON.stringify(data);
    res.send(result);
}

export const insertWaitingList = async (req, res) => {
    const { rid, name, email, phone, pax } = req.body;

    const customersList = await WaitingList.findOne({ restaurant: rid });

    for (let d of customersList.customers) {
        if (d.cname === name) {
            res.send({ message: "You have already reserved a table here" })
            return
        }
    }

    const resp = await WaitingList.updateOne(
        { _id: customersList._id },
        { $push: { customers: { cname: name, phone, email, pax } } }
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
    let resp = null;

    const { _id, change } = req.body;
    if (change === 'name') {
        const { name } = req.body;
        resp = await Customer.findOneAndUpdate({ '_id': _id }, {
            $set: { 'name': name }
        }, { new: true })
    }
    else if (change === 'email') {
        const { email, password } = req.body;
        resp = await Customer.findOneAndUpdate({ '_id': _id, 'password': password }, {
            $set: { 'email': email }
        }, { new: true })
    }
    else if (change === 'phone') {
        const { phone, password } = req.body;
        resp = await Customer.findOneAndUpdate({ '_id': _id, 'password': password }, {
            $set: { 'phone': phone }
        }, { new: true })
    }
    else if (change === 'password') {
        const { opass, npass } = req.body;
        resp = await Customer.findOneAndUpdate({ '_id': _id, 'password': opass },
            {
                $set: {
                    'password': npass
                }
            }, { new: true })
        if (resp) {
            resp['message'] = 'Password Updated Successfully'
        }
        else {
            resp['message'] = 'Existing password does not match'
        }
    }

    if (resp) {
        delete resp._doc.password
        delete resp._doc.refresh_token

        const accessToken = jwt.sign({ ...resp._doc, userType: 'customer' }, 'test', { expiresIn: '30s' });
        const refreshToken = jwt.sign({ ...resp._doc, userType: 'customer' }, 'test', { expiresIn: '1d' });

        await Customer.findByIdAndUpdate(resp._id, { ...resp._doc, refresh_token: refreshToken }, { new: true });

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).send({ accessToken });
    }
    else {
        res.status(401).send('Wrong Password');
    }
}

export const deleteAccount = async (req, res) => {
    const { _id, password } = req.body;
    const response = await Customer.deleteOne({ '_id': _id, 'password': password })
    if (response.deletedCount == 1) {
        res.send(JSON.stringify({ 'message': 'Success' }))
    }
    else {
        res.send(JSON.stringify({ 'message': 'Failure' }))
    }
}

export const getCustomerBills = async (req, res) => {
    const { phone } = req.body;
    const response = await Bill.findMany({ 'customer': phone })
    res.send(JSON.stringify(response))
}

export const checkWaiting = async (req, res) => {
    const { rid, phone } = req.body;
    const resp = await WaitingList.findOne({ 'restaurant': rid })
    const customers = resp._doc.customers;
    for (var c of customers) {
        if (c['phone'] === phone) {
            res.send(JSON.stringify({ "waiting": true }))
            return
        }
    }
    res.send(JSON.stringify({ "waiting": false }))
}

export const checkDining = async (req, res) => {
    const { rid, phone } = req.body;
    const resp = await DiningList.findOne({ 'restaurant': rid })
    const customers = resp._doc.customers;
    for (var c of customers) {
        if (c['phone'] === phone) {
            res.send(JSON.stringify({ "dining": true }))
            return
        }
    }
    res.send(JSON.stringify({ "dining": false }))
}

export const getVisitedRestaurants = async (req, res) => {
    const { phone } = req.body;
    const resp = await Bill.find({ 'customer': phone });
    console.log(resp)
    res.send(JSON.stringify(resp))
}

export const setLastCity = async(req,res)=>{
    const {_id,city} = req.body;
    
    const data = await Customer.findOneAndUpdate({'_id':_id},
    {'last_city':city}, {new: true}) ;

    const accessToken = jwt.sign({ ...data._doc, userType: 'customer' }, 'test', { expiresIn: '30s' });
    const refreshToken = jwt.sign({ ...data._doc, userType: 'customer' }, 'test', { expiresIn: '1d' });

    await Customer.findByIdAndUpdate(data._id, { ...data._doc, refresh_token: refreshToken }, { new: true })

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).send({ accessToken });
    
}