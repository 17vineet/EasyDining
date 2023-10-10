import express from 'express';

import {
    addCuisine,
    getCuisines,
    addItem,
    getItems
} from '../controller/menuController.js';

const router = express.Router();

router.post('/addNewCuisine', addCuisine);
router.post('/getCuisines', getCuisines);
router.post('/getItems', getCuisines);
router.post('/addNewItem', addItem);

export default router