import  express from "express";

import {createTodaysSpecialFood, getAllSpecialFoods, deleteSpecialFood} from "../../controllers/dashboardFoodController/todaysSpecialFoodController.js";


const router = express.Router()


// get all special food items
router.get('/', getAllSpecialFoods)

//post new food
router.post('/', createTodaysSpecialFood)

// delete special food
router.delete('/:id', deleteSpecialFood)



export default router