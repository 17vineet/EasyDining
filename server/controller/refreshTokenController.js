import jwt from 'jsonwebtoken';

import { Customer, Restaurant } from '../Database/models.js';

const handleTokenController = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    const userType = jwt.decode(refreshToken).userType;

    let foundUser = "";
    if (userType === 'restaurant') foundUser = await Restaurant.findOne({ refresh_token: refreshToken });
    else foundUser = await Customer.findOne({ refresh_token: refreshToken });

    if (!foundUser) return res.sendStatus(403); //Forbidden 

    // evaluate JWT
    jwt.verify(refreshToken, 'test', (err, decoded) => {
        if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

        delete foundUser._doc.password
        delete foundUser._doc.refresh_token;

        const accessToken = jwt.sign({ ...foundUser._doc, userType }, 'test', { expiresIn: '30s' });
        res.status(200).send({ accessToken });
    });
}

export default handleTokenController;