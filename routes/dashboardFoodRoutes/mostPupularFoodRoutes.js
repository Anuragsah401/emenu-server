import express from "express";

import {getAllMostPopularFood, createMostPopularFood, deleteMostPopularFood} from "../../controllers/dashboardFoodController/mostPopularFoodController.js";

const router = express.Router()


// get all special food items
router.get('/', getAllMostPopularFood)

//post new food
router.post('/', createMostPopularFood)

// delete food
router.delete('/:id', deleteMostPopularFood)

export default router