import express, { json, urlencoded } from 'express';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';

import cloudinaryRoutes from './routes/cloudinary.js' ;
import menuRoutes from './routes/menu.js'
import customerRouters from './routes/customer.js' ;
import restaurantRoutes from './routes/restaurant.js' ;
import { connectToDb } from "./Database/config.js";
import handleRefreshToken from './controller/refreshTokenController.js'
import handleLogout from './controller/logoutController.js';

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,        
    optionSuccessStatus:200
}

const app = express();
app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser()) ;
app.use(urlencoded({ extended: true }));

multer({ dest: 'uploads/' })
connectToDb();

app.get('/refresh', handleRefreshToken) ;
app.use('/cloudinary', cloudinaryRoutes) ;
app.use('/customer', customerRouters) ;
app.use('/restaurant', restaurantRoutes) ;
app.use('/menu', menuRoutes) ;
app.get('/logout', handleLogout)

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(4000, () => {
    console.log("listening");
});