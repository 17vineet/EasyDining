import { trusted } from 'mongoose';
import jwt from 'jsonwebtoken';
import { Restaurant, WaitingList, DiningList, Menu, Customer, Bill, Cuisine, Item } from "../Database/models.js";


export const getCuisines = async (req, res) => {
    const response = await Cuisine.find({});
    // console.log(response)
    res.send(JSON.stringify(response))
}

export const addCuisine = async (req, res) => {
    const { cuisine } = req.body;
    const resp = await Cuisine.findOne({ 'name': cuisine })
    if (resp != null) {
        res.send("This cuisine already exists")
        return
    }
    else {
        const data = new Cuisine({ 'name': cuisine })
        const response = await data.save()
        res.send(JSON.stringify(response))
        console.log(response)
    }
}


export const getItems = async (req, res) => {
    const response = await Item.find({});
    res.send(JSON.stringify(response))
}

export const addItem = async (req, res) => {
    const { item } = req.body;
    const resp = await Item.findOne({ 'name': item })
    if (resp != null) {
        res.send("This cuisine already exists")
        return
    }
    else {
        const data = new Item({ 'name': item })
        const response = await data.save()
        res.send(JSON.stringify(response))
        console.log(response)
    }
}