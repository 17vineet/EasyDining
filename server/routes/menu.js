import express from 'express';

import {
    addCuisine,
    getCuisines,
    addItem,
    getItemsByCuisine,
    addMulCuisine
} from '../controller/menuController.js';

const router = express.Router();

router.post('/addNewCuisine', addCuisine);
router.post('/getCuisines', getCuisines);
router.post('/getCuisineItems', getItemsByCuisine);
router.post('/addNewItem', addItem);
router.post('/addMulCuisines', addMulCuisine);

export default router