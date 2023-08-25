const express = require('express');
const app = express();
const multer = require('multer');
const { cloudinary, storage, parser } = require('./Cloudinary/cloudinary');
// const upload = multer({ storage: storage })

const upload = multer({ dest: 'uploads/' })
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/uploadRestaurantImages', parser, async (req, res) => {


    // console.log(req.body, req.file.path);
    // res.send({
    //     "url":req.file.path
    // })
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


    // console.log(req.body, req.file.path);
    // res.send({
    //     "url":req.file.path
    // })
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



app.get("/", (req, res) => {
    res.send("Hello World");
})
app.listen(4000, () => {
    console.log("listening");
});