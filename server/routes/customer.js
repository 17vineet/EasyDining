import express from 'express' ;

import { 
    signInCustomer, 
    signUpCustomer, 
    getAllRestaurants, 
    insertWaitingList 
} from '../controller/customerController.js';

const router = express.Router() ; 

router.post('/signin', signInCustomer) ;
router.post('/signup', signUpCustomer) ;
router.get('/allRestaurants', getAllRestaurants) ;
router.post('/insertWaitingList', insertWaitingList) ;

export default router ;