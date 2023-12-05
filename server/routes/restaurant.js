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
    getRestaurantInfo,
    updateThumbnail,
    deleteRestaurantImage,
    uploadRestaurantImages,
    updateRestaurantDetails,
    deleteCuisine,
    deleteAccount,
    saveTableChanges,
    checkWaiting,
    addOccupiedTable,
    deleteAll,
    showAvailableTables,
    clearOccupied,
    addCuisine,
    addItem,
    getItems,
    placeOrder,
    generateBill,
    viewOrder,
    updateOrder,
    viewBill,
    getRestaurantBills,
    addRating,
    changeAccepting,
    setOpenClose,
    getDailyTotal,
    getMonthlyTotal
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
router.post('/restaurantInfo', getRestaurantInfo);
router.post('/updateThumbnail', updateThumbnail);
router.post('/deleteRestaurantImage',deleteRestaurantImage);
router.post('/uploadimages',uploadRestaurantImages);
router.post('/checkWaiting',checkWaiting);
router.post('/updateDetails',updateRestaurantDetails);
router.post('/deleteCuisine',deleteCuisine);
router.post('/deleteAccount',deleteAccount);
router.post('/changeTables',saveTableChanges);
router.post('/checkWaiting',checkWaiting);
router.post('/addOccupied',addOccupiedTable);
router.post('/deleteAll',deleteAll);
router.post('/availableTables',showAvailableTables);
router.post('/clearOccupied',clearOccupied);
router.post('/addNewCuisine',addCuisine);
router.post('/addItem',addItem);
router.post('/getItems',getItems);
router.post('/placeOrder',placeOrder);
router.post('/viewOrder',viewOrder);
router.post('/generateBill',generateBill);
router.post('/viewBill',viewBill);
router.post('/getBills',getRestaurantBills);
router.post('/addRating',addRating);
router.post('/handleAccept', changeAccepting)
router.post('/setOpenClose', setOpenClose)
router.post('/getDailyTotal', getDailyTotal)
router.post('/getMonthlyTotal', getMonthlyTotal)
router.post('/updateOrder', updateOrder)


export default router;