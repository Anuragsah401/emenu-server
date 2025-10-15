import express from "express";

import { upload } from "../services/useMulter.js";

import {
    getAllFoodItem,
    createFoodItem,
    deleteFoodItem,
    getOneFoodItem,
    updateFoodItem,
  } from "../controllers/foodController.js";



const router = express.Router();

// get all food items
router.get("/", getAllFoodItem);

//post new food item
router.post("/", upload.single("img"), createFoodItem);

// delete food
router.delete("/:id", deleteFoodItem);

// get one food item
router.get('/:id', getOneFoodItem)

//update one food item
router.patch('/:id', upload.single("img"), updateFoodItem)

export default router;
