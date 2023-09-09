import { Restaurant, WaitingList, DiningList, Menu } from "../Database/models.js";

export const signInRestaurant = async (req, res) => {
    const { email, password } = req.body;
    let data = await Restaurant.findOne({ email: email });
    let pass = data.password;
    if (pass === password) {
        const { _id, email, name, range, thumbnail_url, sitting_capacity, location_url } = data;
        const newData = {
            _id: _id,
            email: email,
            name: name, range: range,
            thumbnail_url: thumbnail_url,
            sitting_capacity: sitting_capacity,
            location_url: location_url,
            authenticated: true
        }
        res.send(newData);
    }
    else {
        res.send({ authenticated: false })
    }
}

export const signUpRestaurant = async (req, res) => {
    const { email, password, name, location_url, sitting_capacity, range, thumbnail_url } = req.body;
    let data = new Restaurant({
        email,
        password,
        name,
        location_url,
        sitting_capacity: Number(sitting_capacity),
        range,
        thumbnail_url
    })
    const result = await data.save();

    const data1 = new WaitingList({ restaurant: result._id });

    const data2 = new DiningList({ restaurant: result._id });

    const data3=new Menu({ restaurant: result._id })

    await data1.save();
    await data2.save();
    await data3.save();

    res.send(JSON.stringify(result));
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

    console.log(menulist);

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
    // res.send(JSON.stringify(response))
}

export const addCuisine = async (req, res) => {
    const {rid,cuisine}=req.body;

    const response = await Menu.updateOne(
        { "restaurant": rid},
        { $push: { menu: {'name':cuisine,'items':[]} } })
    console.log(response)
    
    res.send(JSON.stringify(response))
}