import express from 'express';

import {
    signInRestaurant,
    signUpRestaurant,
    getWaitingList,
    insertWaitingList,
    removeWaitingCustomer,
    getDiningList,
    insertDiningList,
    removeDiningCustomer,
    addToDineIn,
    updateMenu,
    getMenu,
    addCuisine,
    getRestaurantInfo,
    updateThumbnail,
    deleteRestaurantImage,
    uploadRestaurantImages,
    checkWaiting,
    updateRestaurantDetails,
    deleteCuisine
} from '../controller/restaurantController.js';

const router = express.Router();

router.post('/signin', signInRestaurant);
router.post('/signup', signUpRestaurant);
router.post('/getWaitingList', getWaitingList)
router.post('/insertWaitingList', insertWaitingList);
router.post('/removeWaitingCustomer', removeWaitingCustomer);
router.post('/getDiningList', getDiningList);
router.post('/insertDiningList', insertDiningList);
router.post('/removeDiningCustomer', removeDiningCustomer);
router.post('/addToDineIn', addToDineIn);
router.post('/updateRestaurantMenu', updateMenu);
router.post('/getRestaurantMenu', getMenu);
router.post('/addNewCuisine', addCuisine);
router.post('/restaurantInfo', getRestaurantInfo);
router.post('/updateThumbnail', updateThumbnail);
router.post('/deleteRestaurantImage',deleteRestaurantImage);
router.post('/uploadimages',uploadRestaurantImages);
router.post('/checkWaiting',checkWaiting);
router.post('/updateDetails',updateRestaurantDetails);
router.post('/deleteCuisine',deleteCuisine);

export default router;