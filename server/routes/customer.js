import express from 'express';

import auth from '../middlewares/auth.js';
import {
    signInCustomer,
    signUpCustomer,
    getAllRestaurants,
    insertWaitingList,
    cancelReservation,
    updateCustomerDetails,
    deleteAccount,
    getCustomerBills,
    checkDining,
    checkWaiting
} from '../controller/customerController.js';

const router = express.Router();

router.post('/signin', signInCustomer);
router.post('/signup', signUpCustomer);
router.get('/allRestaurants', getAllRestaurants);
router.post('/insertWaitingList', auth, insertWaitingList);
router.post('/cancelReservation', auth, cancelReservation);
router.post('/updateDetails', updateCustomerDetails);
router.post('/deleteAccount',deleteAccount);
router.post('/getBills',getCustomerBills);
router.post('/checkDining',checkDining);
router.post('/checkWaiting',checkWaiting);

export default router;