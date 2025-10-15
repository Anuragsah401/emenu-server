import mongoose from "mongoose";

import todaysSpecialModel from "../../models/dashboardFoodModel/todaysSpecialFoodModel.js";

// get all special food items
const getAllSpecialFoods = async (req, res) => {
  const food = await todaysSpecialModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(food);
};

const createTodaysSpecialFood = async (req, res) => {
  const documents = req.body;


  // add doc to db
  try {
    const specialFood = await todaysSpecialModel.insertMany(documents);
    res.status(200).json(specialFood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a special food
const deleteSpecialFood = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "cannot delete Invalid id" });
  }

  const deletedSpecialFood = await todaysSpecialModel.findOneAndDelete({
    _id: id,
  });

  if (!deletedSpecialFood) {
    return res.status(404).json({ errors: "No such food found to delete" });
  }

  res.status(200).json(deletedSpecialFood);
};


export {
  createTodaysSpecialFood,
  getAllSpecialFoods,
  deleteSpecialFood,
};
