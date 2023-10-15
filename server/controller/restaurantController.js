import jwt from 'jsonwebtoken';

import { Restaurant, WaitingList, DiningList, Menu, Customer, Bill, Cuisine, Order } from "../Database/models.js";
import { trusted } from 'mongoose';
import { deleteAllImages } from '../Cloudinary/controller.js';

function containsOnlyNumbers(inputStr) {
    return /^[0-9]+$/.test(inputStr);
}

export const signInRestaurant = async (req, res) => {
    let data = null;
    const { emailpass, password } = req.body;

    if (containsOnlyNumbers(emailpass)) {
        data = await Restaurant.findOne({ 'phone': emailpass })
    }
    else {
        data = await Restaurant.findOne({ 'email': emailpass })
    }

    if (data) {
        let pass = data.password;
        if (pass === password) {
            delete data._doc.password;
            delete data._doc.refresh_token;

            // creating JWT
            const accessToken = jwt.sign({ ...data._doc, userType: 'restaurant' }, 'test', { expiresIn: '30s' });
            const refreshToken = jwt.sign({ ...data._doc, userType: 'restaurant' }, 'test', { expiresIn: '1d' });

            // saving the refreshToken with the current user in DB
            await Restaurant.findByIdAndUpdate(data._id, { ...data._doc, refresh_token: refreshToken }, { new: true });

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).send({ accessToken });
        }
        else {
            res.status(401).send("Invalid Credentials")
        }
    }
    else {
        res.status(404).send("User account not found")
    }
}

export const signUpRestaurant = async (req, res) => {
    try {
        const data = new Restaurant({ ...req.body, 'total_tables': { 'tableSize': [], 'noOfTables': [] }, 'occupied_tables': { 'tableSize': [], 'noOfTables': [] } });
        var result = await data.save();
    }
    catch (e) {
        console.log(e)
        if (e?.keyValue?.email != undefined) {
            res.status(409).send(`An account already exists corresponding to this email id`)
            return
        }
        else if (e?.keyValue?.phone != undefined) {
            res.status(409).send(`An account already exists corresponding to this phone number`)
            return
        }
        else {
            res.status(409).send(`Something went wrong`)
            return
        }
    }

    const data1 = new WaitingList({ restaurant: result._id });
    const data2 = new DiningList({ restaurant: result._id });
    const data3 = new Menu({ restaurant: result._id })
    const data4 = new Order({ 'restaurant': result._id, 'customers': [] })

    await data1.save();
    await data2.save();
    await data3.save();
    await data4.save();

    delete result._doc.password;
    delete result._doc.refresh_token;

    // creating JWT
    const accessToken = jwt.sign({ ...result._doc, userType: 'restaurant' }, 'test', { expiresIn: '30s' });
    const refreshToken = jwt.sign({ ...result._doc, userType: 'restaurant' }, 'test', { expiresIn: '1d' });

    // saving the refreshToken with the current user in DB
    await Restaurant.findByIdAndUpdate(result._id, { ...result._doc, refresh_token: refreshToken }, { new: true });

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).send({ accessToken });
}

export const getRestaurantInfo = async (req, res) => {
    const { rid } = req.body;
    const response = await Restaurant.findOne({ "_id": rid })

    delete response._doc.password;

    res.send(JSON.stringify(response._doc));
}

export const getWaitingList = async (req, res) => {
    const { rid } = req.body;
    const resp = await WaitingList.findOne({ restaurant: rid });
    res.send(JSON.stringify(resp));
}

export const insertWaitingList = async (req, res) => {
    const { rid, name, pax, phone, email } = req.body;

    // console.log(pax);

    const customersList = await WaitingList.findOne({ restaurant: rid });

    // console.log(customersList);

    const resp = await WaitingList.updateOne(
        { _id: customersList._id },
        { $push: { customers: { cname: name, pax: pax, phone: phone, email } } }
    );

    res.send(resp);
}

export const removeWaitingCustomer = async (req, res) => {
    const { rid, phone } = req.body;
    try {
        const resp = await WaitingList.updateOne({ restaurant: rid },
            { $pull: { customers: { phone: phone } } });
        // console.log(resp);
        res.send(JSON.stringify(resp));
    } catch (err) {
        console.error(err);
    }
}

export const getDiningList = async (req, res) => {
    const { rid } = req.body;
    const resp = await DiningList.findOne({ restaurant: rid });
    res.send(JSON.stringify(resp));
}

export const insertDiningList = async (req, res) => {

    const { rid, name, phone, email, pax, size } = req.body;
    const customersList = await DiningList.findOne({ restaurant: rid });

    const resp = await DiningList.updateOne(
        { _id: customersList._id },
        { $push: { customers: { cname: name, email, phone, pax, size } } }
    );

    res.send(resp);
}

export const removeDiningCustomer = async (req, res) => {
    const { rid, phone, tableSize } = req.body;
    try {
        const resp = await DiningList.updateOne({ restaurant: rid },
            { $pull: { customers: { phone: phone } } })
        const resp2 = await deleteOccupiedTable(rid, tableSize);
        console.log(resp2)
        res.send(resp)
    } catch (err) {
        console.error(err);
    }
}

export const addToDineIn = async (req, res) => {
    const { rid, cname, email, phone, pax, size } = req.body;

    const diningList = await DiningList.findOne({ restaurant: rid });

    // console.log(diningList);

    const resp = await DiningList.updateOne(
        { _id: diningList._id },
        { $push: { customers: { cname, email, phone, pax, size } } }
    );

    res.send(JSON.stringify(resp));
}

export const getMenu = async (req, res) => {
    const { rid } = req.body;

    const menulist = await Menu.findOne({ restaurant: rid });

    res.send(JSON.stringify(menulist));
}

export const updateMenu = async (req, res) => {
    const newMenuItems = req.body.items;
    const rid = req.body.rid
    const cuisine_name = req.body.cuisine_name;
    const response = await Menu.updateOne(
        { "restaurant": rid, "menu.name": cuisine_name },
        { $set: { "menu.$.items": newMenuItems } })
    // console.log(response)
    res.send(JSON.stringify(response))
}

export const updateThumbnail = async (req, res) => {
    const { rid, thumbnail_url } = req.body;

    const response = await Restaurant.updateOne(
        { "_id": rid },
        { $set: { thumbnail_url: thumbnail_url } })
    // console.log(response)

    res.send(JSON.stringify(response))
}

export const deleteRestaurantImage = async (req, res) => {
    const { rid, img_url } = req.body;

    const response = await Restaurant.updateOne(
        { "_id": rid },
        {
            $pull: {
                "images_urls": img_url
            }
        }
    )
    res.send(JSON.stringify(response))
}

export const uploadRestaurantImages = async (req, res) => {
    const { rid, images_urls } = req.body;
    console.log(images_urls);
    const response = await Restaurant.updateOne(
        { "_id": rid },
        { $push: { images_urls: { $each: images_urls } } })
    console.log(response)

    res.send(JSON.stringify(response))
}

export const deleteAccount = async (req, res) => {
    const { rid, password } = req.body;
    const resp = await Restaurant.findOne({ '_id': rid, 'password': password })
    const response = await Restaurant.deleteOne({ '_id': rid, 'password': password })
    if (response.deletedCount == 1) {
        res.send(JSON.stringify({ 'message': 'Success' }))
        await Waiting.deleteOne({ 'restaurant': rid })
        await Dining.deleteOne({ 'restaurant': rid })
        await Menu.deleteOne({ 'restaurant': rid })
    }
    else {
        res.send(JSON.stringify({ 'message': 'Failure' }))
    }
    if (resp == null) {
        return
    }
    let img_urls = resp.images_urls;
    img_urls.push(resp.thumbnail_url)
    const resp2 = await deleteAllImages(img_urls);
}

export const saveTableChanges = async (req, res) => {
    const { tables, _id } = req.body;
    const resp = await Restaurant.updateOne({ '_id': _id }, { 'total_tables': tables })
    if (resp.modifiedCount == 1) {
        res.send(JSON.stringify({ 'message': 'Success' }))
    }
    else {
        res.send(JSON.stringify({ 'message': 'Failure' }))
    }
}

export const updateRestaurantDetails = async (req, res) => {
    const { rid, change } = req.body;
    let resp = null
    if (change === 'name') {
        const { name } = req.body;
        resp = await Restaurant.findOneAndUpdate({ '_id': rid },
            { $set: { 'name': name } }, { new: true })
    }
    else if (change === 'phone') {
        const { phone, password } = req.body;
        resp = await Restaurant.findOneAndUpdate({ '_id': rid, 'password': password },
            { $set: { 'phone': phone } }, { new: true })
    }
    else if (change === 'email') {
        const { email, password } = req.body;
        resp = await Restaurant.findOneAndUpdate({ '_id': rid, 'password': password },
            { $set: { 'email': email } }, { new: true })
    }
    else if (change === 'password') {
        const { opass, npass } = req.body;
        resp = await Restaurant.findOneAndUpdate({ '_id': rid, 'password': opass },
            { $set: { 'password': npass } }, { new: true })
    }

    if (resp) {
        delete resp._doc.password
        delete resp._doc.refresh_token

        const accessToken = jwt.sign({ ...resp._doc, userType: 'restaurant' }, 'test', { expiresIn: '30s' });
        const refreshToken = jwt.sign({ ...resp._doc, userType: 'restaurant' }, 'test', { expiresIn: '1d' });

        await Restaurant.findByIdAndUpdate(resp._id, { ...resp._doc, refresh_token: refreshToken }, { new: true });

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).send({ accessToken });
    }
    else {
        res.status(401).send('Wrong Password');
    }

}


export const updateTable = async (req, res) => {
    const { rid, total_tables } = req.body;
    const response = await Restaurant.findOneAndUpdate({ 'restaurant': rid },
        { $set: { 'total_tables': total_tables } }, { new: true })
    console.log(response)

    res.send(JSON.stringify(response))
}

export const checkWaiting = async (req, res) => {
    const { rid, pax } = req.body;
    console.log("Checking for " + pax + " people")
    const response = await Restaurant.findOne({ "_id": rid })
    let tableSize = response.total_tables.tableSize;
    let noOfTables = response.total_tables.noOfTables;
    let l = []
    for (let ind in tableSize) {
        if (tableSize[ind] >= pax) {
            l.push([tableSize[ind], noOfTables[ind]])
        }
    }
    l.sort((a, b) => a[0] - b[0])
    console.log(response.occupied_tables)
    for (let tab of l) {
        const ocIndex = response.occupied_tables.tableSize.indexOf(tab[0])
        if (ocIndex == -1) {
            res.send({ "message": "Available", "Size": tab[0] })
            return;

        }
        else {
            if (tab[1] - response.occupied_tables.noOfTables[ocIndex] >= 1) {
                res.send({ "message": "Available", "Size": tab[0] })
                return;
            }
            else { continue }
        }
    }
    res.send(JSON.stringify({ 'message': "Unavailable" }))
}

export const addOccupiedTable = async (req, res) => {
    const { rid, pax } = req.body;
    console.log(pax)
    const response = await Restaurant.findOne({ "_id": rid })
    let tableSize = response.total_tables.tableSize;
    let noOfTables = response.total_tables.noOfTables;
    let l = []
    for (let ind in tableSize) {
        if (tableSize[ind] >= pax) {
            l.push([tableSize[ind], noOfTables[ind]])
        }
    }
    l.sort((a, b) => a[0] - b[0])
    for (let tab of l) {
        const ocIndex = response.occupied_tables.tableSize.indexOf(tab[0])
        if (ocIndex == -1) {
            await Restaurant.updateOne({ '_id': rid },
                { $set: { 'occupied_tables': { 'tableSize': [...response.occupied_tables.tableSize, tab[0]], 'noOfTables': [...response.occupied_tables.noOfTables, 1] } } })
            res.send({ "message": "Available", "Size": tab[0] })
            return;
        }
        else {
            const oc = response.occupied_tables.noOfTables[ocIndex]
            if (tab[1] - oc >= 1) {
                let occupied_modified = response.occupied_tables.noOfTables;
                occupied_modified[ocIndex] = oc + 1
                await Restaurant.updateOne({ '_id': rid },
                    {
                        $set: {
                            'occupied_tables': { 'tableSize': response.occupied_tables.tableSize, 'noOfTables': occupied_modified }
                        }
                    })
                res.send({ "message": "Available", "Size": tab[0] })
                return;
            }
            else {
                continue
            }
        }
    }
    res.send(JSON.stringify({ 'message': "Unavailable" }))
}

const deleteOccupiedTable = async (rid, tableSize) => {
    console.log(rid, tableSize)
    const resp = await Restaurant.findOne({ '_id': rid })
    let noOfTables = resp.occupied_tables.noOfTables;
    const ocIndex = resp.occupied_tables.tableSize.indexOf(tableSize)
    if (noOfTables[ocIndex] >= 1) {
        noOfTables[ocIndex] -= 1
    }
    const resp2 = await Restaurant.updateOne({ '_id': rid },
        { $set: { 'occupied_tables': { 'tableSize': resp.occupied_tables.tableSize, 'noOfTables': noOfTables } } })
    if (resp2.modifiedCount == 1) {
        return "Deleted Occupied Table"
    }
    else {
        return "Failed to delete Occupied table"
    }
}

export const deleteAll = async (req, res) => {
    await Restaurant.deleteMany({})
    await Menu.deleteMany({})
    await Bill.deleteMany({})
    await DiningList.deleteMany({})
    await Customer.deleteMany({})
    await WaitingList.deleteMany({})
    res.send("Success")
}

export const showAvailableTables = async (req, res) => {
    const { rid } = req.body;
    const response = await Restaurant.findOne({ '_id': rid });
    let available_tables = []
    let tableSize = response.total_tables.tableSize;
    let noOfTables = response.total_tables.noOfTables;
    for (var tabIndex in tableSize) {
        const ocIndex = response.occupied_tables.tableSize.indexOf(tableSize[tabIndex]);
        if (ocIndex != -1) {
            available_tables.push([tableSize[tabIndex], noOfTables[tabIndex] - response.occupied_tables.noOfTables[ocIndex]])
        }
        else {
            available_tables.push([tableSize[tabIndex], noOfTables[tabIndex]])
        }
    }
    res.send(JSON.stringify(available_tables))
}

export const clearOccupied = async (req, res) => {
    const { rid } = req.body;
    const resp = await Restaurant.updateOne({ '_id': rid }, { $set: { 'occupied_tables': { 'tableSize': [], 'noOfTables': [] } } });
    res.send(JSON.stringify(resp))
}

export const addCuisine = async (req, res) => {
    const { rid, cuisineId, cuisineName } = req.body;
    const resp2 = await Menu.findOne()
    const resp = await Menu.findOneAndUpdate({ 'restaurant': rid },
        {
            $push: { 'menu': { 'name': cuisineName, 'cid': cuisineId, items: [] } }
        }, { new: true })
    console.log(resp)
    res.send(resp)
}

export const deleteCuisine = async (req, res) => {
    const { rid, cuisine } = req.body;
    const response = await Menu.findOneAndUpdate(
        { "restaurant": rid },
        { $pull: { 'menu': { 'name': cuisine } } },
        { new: true })
    console.log(response)

    res.send(JSON.stringify(response))
}

export const addItem = async (req, res) => {
    const { rid, cuisineName, itemName, itemDesc, itemPrice } = req.body;
    const response = await Menu.findOneAndUpdate({ 'restaurant': rid, "menu.name": cuisineName },
        { $push: { "menu.$.items": { "itemName": itemName, "Price": itemPrice, "itemDesc": itemDesc } } },
        { new: true })
}

export const getItems = async (req, res) => {
    const { rid, cuisineName } = req.body;
    const response = await Menu.findOne({ 'restaurant': rid, "menu.name": cuisineName })
    res.send(JSON.stringify(response))
}

export const placeOrder = async (req, res) => {
    const { rid, phone, order } = req.body;
    const response = await Order.findOne({ 'restaurant': rid, "customer": phone })
    if (response != null) {
        let orders = response.order;
        for (var i of order) {
            orders.push(i)
        }
        const resp2 = await Order.findOneAndUpdate({ 'restaurant': rid, "customer": phone },
            { $set: { 'order': orders } }, { new: true })
        res.send(resp2)
    }
    else {
        const data = new Order({ 'restaurant': rid, 'customer': phone, 'order': order })
        await data.save()
        res.send(JSON.stringify("Created new order"))
    }
}

export const viewOrder = async (req, res) => {
    const { rid, phone } = req.body;
    const response = await Order.findOne({ 'restaurant': rid, "customer": phone })
    if (response != null) {
        res.send(response)
    }
    else {
        res.send(JSON.stringify({ "message": "Order Not Found" }))
    }
}

export const generateBill = async (req, res) => {
    const { rid, phone } = req.body;
    const resp = await Order.findOne({ 'restaurant': rid, "customer": phone })
    let arr = [...resp._doc.order];
    let bill = []
    let totalAmt = 0
    for (var i of arr) {
        let found = false
        totalAmt += parseInt(i['price'] * i['quantity'])
        for (var j of bill) {
            if (j['name'] === i['name'] && j['price'] === i['price']) {
                j['quantity'] += i['quantity']
                found = true;
                break;
            }
        }
        if (found == false) {
            bill.push(i);
        }
    }
    
    const today = new Date()
    const billData = new Bill({ 'rid': rid, 'customer': phone, 'orderId': resp._id, 'bill': bill, 'billAmt': totalAmt, 'billDate':today.toLocaleDateString(), 'billTime':today.toLocaleTimeString() })
    await billData.save();
    await Order.deleteOne({ "_id": resp._id })
    res.send(JSON.stringify({ "orderId": resp._id }))
}

export const viewBill = async (req, res) => {
    const { orderId } = req.body;
    const resp = await Bill.findOne({ 'orderId': orderId })
    if(resp)
    {
        res.send(JSON.stringify(resp))
    }
    else
    {
        res.send(JSON.stringify({'message':'Bill Not Found'}));
    }
}