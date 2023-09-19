import express, { json, urlencoded } from 'express';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';

import cloudinaryRoutes from './routes/cloudinary.js' ;
import customerRouters from './routes/customer.js' ;
import restaurantRoutes from './routes/restaurant.js' ;
import { connectToDb } from "./Database/config.js";
import handleRefreshToken from './controller/refreshTokenController.js'
import handleLogout from './controller/logoutController.js';


const app = express();
app.use(cors());
app.use(json());
app.use(cookieParser()) ;
app.use(urlencoded({ extended: true }));

multer({ dest: 'uploads/' })
connectToDb();

app.get('/refresh', handleRefreshToken) ;
app.use('/cloudinary', cloudinaryRoutes) ;
app.use('/customer', customerRouters) ;
app.use('/restaurant', restaurantRoutes) ;
app.get('/logout', handleLogout)

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(4000, () => {
    console.log("listening");
});