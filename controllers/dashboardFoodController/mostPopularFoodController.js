import mongoose from "mongoose";

import mostPopularFoodModel from "../../models/dashboardFoodModel/mostPopularFoodModel.js";

// get all most popular food items
const getAllMostPopularFood = async (req, res) => {
    const food = await mostPopularFoodModel.find({}).sort({createdAt: -1})
    res.status(200).json(food)
}


// create a new workout
const createMostPopularFood = async (req, res) => {
    const documents = req.body;

    // add doc to db
    try {
      const specialFood = await mostPopularFoodModel.insertMany(documents);
      res.status(200).json(specialFood);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

// delete a most popular food
const deleteMostPopularFood  = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'cannot delete Invalid id'})
    }

    const deletedMostPopularFood = await mostPopularFoodModel.findOneAndDelete({_id:id})

    if(!deletedMostPopularFood){
        return res.status(404).json({errors: "No such food found to delete"})
    }

    res.status(200).json(deletedMostPopularFood)
    
}

export {getAllMostPopularFood, createMostPopularFood, deleteMostPopularFood}