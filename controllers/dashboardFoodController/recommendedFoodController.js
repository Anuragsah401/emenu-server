import mongoose from 'mongoose'

import recommendedFoodModel from '../../models/dashboardFoodModel/recommendedFoodModel.js'

// get all special food items
const getAllRecommendedFoods = async (req, res) => {
    const food = await recommendedFoodModel.find({}).sort({createdAt: -1})
    res.status(200).json(food)
}


// create a new workout
const createRecommendedFood = async (req, res) => {
    const documents = req.body;

  // add doc to db
  try {
    const specialFood = await recommendedFoodModel.insertMany(documents);
    res.status(200).json(specialFood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteRecommendedFood  = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'cannot delete Invalid id'})
    }

    const deleteRecommendedFood = await recommendedFoodModel.findOneAndDelete({_id:id})

    if(!deleteRecommendedFood){
        return res.status(404).json({errors: "No such food found to delete"})
    }

    res.status(200).json(deleteRecommendedFood)
    
}

export {getAllRecommendedFoods, createRecommendedFood, deleteRecommendedFood}