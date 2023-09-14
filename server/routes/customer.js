import express from 'express' ;

import { 
    signInCustomer, 
    signUpCustomer, 
    getAllRestaurants, 
    insertWaitingList ,
    cancelReservation
} from '../controller/customerController.js';

const router = express.Router() ; 

router.post('/signin', signInCustomer) ;
router.post('/signup', signUpCustomer) ;
router.get('/allRestaurants', getAllRestaurants) ;
router.post('/insertWaitingList', insertWaitingList) ;
router.post('/cancelReservation', cancelReservation) ;


export default router ;