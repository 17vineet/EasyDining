import jwt from 'jsonwebtoken';

import { Restaurant, WaitingList, DiningList, Menu } from "../Database/models.js";

export const signInRestaurant = async (req, res) => {
    const { email, password } = req.body;
    let data = await Restaurant.findOne({ email: email });
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
    const data = new Restaurant({ ...req.body });
    const result = await data.save();

    const data1 = new WaitingList({ restaurant: result._id });
    const data2 = new DiningList({ restaurant: result._id });
    const data3 = new Menu({ restaurant: result._id })

    await data1.save();
    await data2.save();
    await data3.save();

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

    // console.log(name);

    const customersList = await WaitingList.findOne({ restaurant: rid });

    console.log(customersList);

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
            console.log(resp);
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

    const { rid, name, phone, email, pax } = req.body;
    const customersList = await DiningList.findOne({ restaurant: rid });

    const resp = await DiningList.updateOne(
        { _id: customersList._id },
        { $push: { customers: { cname: name, email, phone, pax } } }
    );

    res.send(resp);
}

export const removeDiningCustomer = async (req, res) => {
    const { rid, phone } = req.body;
    try {
        const resp = await DiningList.updateOne({ restaurant: rid },
            { $pull: { customers: { phone: phone } } })
        res.send(resp)
    } catch (err) {
        console.error(err);
    }
}

export const addToDineIn = async (req, res) => {
    const { rid, cname, email, phone, pax } = req.body;

    const diningList = await DiningList.findOne({ restaurant: rid });

    console.log(diningList);

    const resp = await DiningList.updateOne(
        { _id: diningList._id },
        { $push: { customers: { cname, email, phone, pax } } }
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