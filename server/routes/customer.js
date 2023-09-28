import express from 'express';

import auth from '../middlewares/auth.js';
import {
    signInCustomer,
    signUpCustomer,
    getAllRestaurants,
    insertWaitingList,
    cancelReservation,
    updateCustomerDetails,
} from '../controller/customerController.js';

const router = express.Router();

router.post('/signin', signInCustomer);
router.post('/signup', signUpCustomer);
router.get('/allRestaurants', getAllRestaurants);
router.post('/insertWaitingList', auth, insertWaitingList);
router.post('/cancelReservation', auth, cancelReservation);
router.post('/updateDetails', updateCustomerDetails);

export default router;