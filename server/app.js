const express = require('express');
const app = express();
const multer = require('multer');
const { cloudinary, storage, parser } = require('./Cloudinary/cloudinary');
const config=require("./Database/config")
// const upload = multer({ storage: storage })

const upload = multer({ dest: 'uploads/' })
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
config.connectToDb();
config.onBoardRestaurantSchema();
config.createCustomerSchema();
app.post('/uploadRestaurantImages', parser, async (req, res) => {


    const uploadedFiles = req.files;

    // Handle each uploaded file
    const img_urls = [];
    const promises = uploadedFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        console.log(result.secure_url);
        img_urls.push(result.secure_url);
    });

    // Wait for all uploads to complete
    Promise.all(promises)
        .then(() => {
            res.json({ img_urls });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred during upload' });
        });

});
app.post('/uploadRestaurantThumbnail', parser, async (req, res) => {

    const uploadedFiles = req.files;

    // Handle each uploaded file
    const img_urls = [];
    const promises = uploadedFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        console.log(result.secure_url);
        img_urls.push(result.secure_url);
    });

    // Wait for all uploads to complete
    Promise.all(promises)
        .then(() => {
            res.json({ img_urls });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred during upload' });
        });

});

app.post("/register",async (req,res)=>{
    const { username, password } = req.body;
    const resp=await config.insert(username,password);
    res.send(resp);
})


app.post("/onBoardRestaurant",async(req,res)=>{
    const {email,password,name,location_url,sitting_capacity,range,thumbnail_url}=req.body;
    const resp=await config.insertRestaurant(email,password,name,location_url,sitting_capacity,range,thumbnail_url);
    res.send(resp);
})

app.post("/registerCustomer",async(req,res)=>{
    const {email,password,visited}=req.body;
    const resp=await config.insertCustomer(email,password,visited);
    res.send(resp);
})


app.get("/", (req, res) => {
    res.send("Hello World");
})
app.listen(4000, () => {
    console.log("listening");
});