import mongoose from "mongoose";

import foodModel from "../models/foodModel.js";

// get all food items from backery
const getAllFoodItem = async (req, res) => {
  const food = await foodModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(food);
};

// get one food item from backery
const getOneFoodItem = async (req, res) => {
  const { id } = req.params;
  const food = await foodModel.findOne({ _id: id });
  res.status(200).json(food);
};

// update food Item
const updateFoodItem = async (req, res) => {

 const updatedData = {
    img: req.file?.filename,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,  
    available: req.body.available
  };

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "cannot update food item Invalid id" });
  }

  const updateFoodItem = await foodModel.updateOne(
    { _id: id },
    { $set: updatedData }
  );

  if (!updateFoodItem) {
    return res.status(404).json({ errors: "No such food found to update" });
  }

  res.status(200).json(updateFoodItem);
};

// create a new workout
const createFoodItem = async (req, res) => {
  const data = {
    img: req.file.filename,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };

  // add doc to db
  try {
    const FoodItem = await foodModel.create(data);

    res.status(200).json(FoodItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a most popular food
const deleteFoodItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "cannot delete Invalid id" });
  }

  const deletedFood = await foodModel.findOneAndDelete({
    _id: id,
  });

  if (!deletedFood) {
    return res.status(404).json({ errors: "No such food found to delete" });
  }

  res.status(200).json(deletedFood);
};

export {
  getAllFoodItem,
  createFoodItem,
  deleteFoodItem,
  getOneFoodItem,
  updateFoodItem,
};
