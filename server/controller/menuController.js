import { trusted } from 'mongoose';
import jwt from 'jsonwebtoken';
import { Restaurant, WaitingList, DiningList, Menu, Customer, Bill, Cuisine} from "../Database/models.js";


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

export const addItem = async (req, res) => {
    const { item,cuisineName } = req.body;
    const response = await Cuisine.findOne({'name':cuisineName,"items.itemName":item})
    if(response==null)
    {
        const resp = await Cuisine.findOneAndUpdate({ 'name': cuisineName },
        {$push:{items:{'itemName':item}}})
        if(resp)
        {
            res.send(JSON.stringify(resp))
        }
        else
        {
            const data = new Cuisine({'name':cuisineName, 'items':[{'itemName':item}]})
            res.send("Added new cuisine to database")
        }
    }
    else
    {
        res.send(JSON.stringify("Item not added"))
    }
}

export const getItemsByCuisine = async(req,res)=>{
    const {cuisineName} = req.body;
    const response = await Cuisine.findOne({'name':cuisineName})
    if(response!=null)
    {
        res.send(JSON.stringify(response))
    }
    else
    {
        res.send(JSON.stringify("Cuisine not found"))
    }
}