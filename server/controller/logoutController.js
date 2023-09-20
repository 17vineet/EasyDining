import jwt from 'jsonwebtoken';

import { Customer, Restaurant } from '../Database/models.js';

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    const refreshToken = cookies.jwt;
    const userType = jwt.decode(refreshToken).userType;

    let foundUser = "";
    if (userType === 'restaurant') {
        foundUser = await Restaurant.findOne({ refresh_token: refreshToken });
        if (foundUser) {
            const updatedUser = await Restaurant.findByIdAndUpdate(
                foundUser._doc._id,
                { ...foundUser._doc, refresh_token: '' },
                { new: true }
            )
        }
    }
    else {
        foundUser = await Customer.findOne({ refresh_token: refreshToken });
        if (foundUser) {
            const updatedUser = await Customer.findByIdAndUpdate(
                foundUser._doc._id,
                { ...foundUser._doc, refresh_token: '' },
                { new: true }
            )
        }
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

export default handleLogout;