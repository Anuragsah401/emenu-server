import  express from "express";

import {getAllRecommendedFoods, createRecommendedFood, deleteRecommendedFood} from "../../controllers/dashboardFoodController/recommendedFoodController.js";

const router = express.Router()


// get all special food items
router.get('/', getAllRecommendedFoods)

// delete food
router.delete('/:id', deleteRecommendedFood)

//post new food
router.post('/', createRecommendedFood)

export default router