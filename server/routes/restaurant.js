import express from 'express' ;

import { 
    signInRestaurant, 
    signUpRestaurant,
    getWaitingList,
    insertWaitingList,
    removeWaitingCustomer,
    getDiningList,
    insertDiningList,
    removeDiningCustomer,
    addToDineIn
} from '../controller/restaurantController.js';

const router = express.Router() ; 

router.post('/signin', signInRestaurant) ;
router.post('/signup', signUpRestaurant) ;
router.post('/getWaitingList', getWaitingList)
router.post('/insertWaitingList', insertWaitingList);
router.post('/removeWaitingCustomer', removeWaitingCustomer) ;
router.post('/getDiningList', getDiningList) ;
router.post('/insertDiningList', insertDiningList);
router.post('/removeDiningCustomer', removeDiningCustomer);
router.post('/addToDineIn', addToDineIn);

export default router ;