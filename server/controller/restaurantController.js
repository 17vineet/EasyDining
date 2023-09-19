import jwt from 'jsonwebtoken';

import { Restaurant, WaitingList, DiningList, Menu } from "../Database/models.js";

export const signInRestaurant = async (req, res) => {
    const { email, password } = req.body;
    let data = await Restaurant.findOne({ email: email });
    if (data) {
        let pass = data.password;
        if (pass === password) {
            delete data._doc.password;
            const token = jwt.sign(data._doc, 'test');
            res.send({ token, authenticated: true });
        }
        else {
            res.send({ authenticated: false, message: "Invalid Credentials" })
        }
    }
    else {
        res.send({ authenticated: false, message: "User account not found" })
    }
}

export const signUpRestaurant = async (req, res) => {
    const data = new Restaurant({ ...req.body });
    const result = await data.save();

    const data1 = new WaitingList({ restaurant: result._id });

    const data2 = new DiningList({ restaurant: result._id });

    const data3 = new Menu({ restaurant: result._id })

    await data1.save();
    await data2.save();
    await data3.save();

    delete result._doc.password;
    const token = jwt.sign(result._doc, 'test');
    res.send(token);
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
    const { rid, name } = req.body;

    console.log(name);

    const customersList = await WaitingList.findOne({ restaurant: rid });

    console.log(customersList);

    const resp = await WaitingList.updateOne(
        { _id: customersList._id },
        { $push: { customers: { cname: name } } }
    );

    res.send(resp);
}

export const removeWaitingCustomer = async (req, res) => {
    const { rid, index } = req.body;
    try {
        const doc = await WaitingList.findOne({ restaurant: rid });
        if (doc) {
            if (index >= 0 && index < doc.customers.length) {
                doc.customers.splice(index, 1);
                let resp = await doc.save();
                console.log('Element deleted successfully.');
                res.send(JSON.stringify(resp))
            } else {
                console.error('Index out of bounds.');
            }
        } else {
            console.error('Document not found.');
        }
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

    const { rid, name } = req.body;

    console.log(name);

    const customersList = await DiningList.findOne({ restaurant: rid });

    console.log(customersList);

    const resp = await DiningList.updateOne(
        { _id: customersList._id },
        { $push: { customers: { cname: name } } }
    );

    res.send(resp);
}

export const removeDiningCustomer = async (req, res) => {
    const { rid, index } = req.body;
    try {
        const doc = await DiningList.findOne({ restaurant: rid });
        if (doc) {
            if (index >= 0 && index < doc.customers.length) {
                doc.customers.splice(index, 1);
                let resp = await doc.save();
                console.log('Element deleted successfully.');
                res.send(JSON.stringify(resp))
            } else {
                console.error('Index out of bounds.');
            }
        } else {
            console.error('Document not found.');
        }
    } catch (err) {
        console.error(err);
    }
}

export const addToDineIn = async (req, res) => {
    const { rid, cname } = req.body;

    const diningList = await DiningList.findOne({ restaurant: rid });

    console.log(diningList);

    const resp = await DiningList.updateOne(
        { _id: diningList._id },
        { $push: { customers: { cname } } }
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
    console.log(response)
    res.send(JSON.stringify(response))
}

export const addCuisine = async (req, res) => {
    const { rid, cuisine } = req.body;

    const response = await Menu.updateOne(
        { "restaurant": rid },
        { $push: { menu: { 'name': cuisine, 'items': [] } } })
    console.log(response)

    res.send(JSON.stringify(response))
}

export const updateThumbnail = async (req, res) => {
    const { rid, thumbnail_url } = req.body;

    const response = await Restaurant.updateOne(
        { "_id": rid },
        { $set: { thumbnail_url: thumbnail_url } })
    console.log(response)

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