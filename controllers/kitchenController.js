import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import kitchenModel from "../models/kitchenModel.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

const loginKitchen = async (req, res) => {
  const { email, password } = req.body;

  try {
    const kitchen = await kitchenModel.login(email, password);

    // crate Token
    const token = createToken(kitchen._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllKitchen = async (req, res) => {
    const customers = await kitchenModel.find({}).sort({createdAt: -1})
    res.status(200).json(customers)
}

export {loginKitchen, getAllKitchen}