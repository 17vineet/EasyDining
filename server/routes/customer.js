import express from 'express' ;

import auth from '../middlewares/auth.js' ;
import { 
    signInCustomer, 
    signUpCustomer, 
    getAllRestaurants, 
    insertWaitingList ,
    cancelReservation,
    updateCustomerDetails,
    updateCustomerPassword
} from '../controller/customerController.js';

const router = express.Router() ; 

router.post('/signin', signInCustomer) ;
router.post('/signup', signUpCustomer) ;
router.get('/allRestaurants', getAllRestaurants) ;
router.post('/insertWaitingList', auth, insertWaitingList) ;
router.post('/cancelReservation', auth, cancelReservation) ;
router.post('/updateDetails', updateCustomerDetails) ;
router.post('/updatePassword', updateCustomerPassword) ;

export default router ;