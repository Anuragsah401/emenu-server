import express from "express";

import {getAllOrderListFood, createOrderListFood, deleteOrderListFood, updateOrderListFood, getOneOrderList, updateCanceledOrder} from "../controllers/orderListController.js";


const router = express.Router()


// get all order list items
router.get('/', getAllOrderListFood)

//post new order list
router.post('/', createOrderListFood)

// get one order list item
router.get('/getOneOrderlistItem/:id', getOneOrderList)

// update food order list
router.patch('/updatelist/:id', updateOrderListFood)

router.patch('/updatecancel/:id', updateCanceledOrder)

// delete order list
router.delete('/:id', deleteOrderListFood)

export default router