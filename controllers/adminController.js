import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.login(email, password);

    // crate Token
    const token = createToken(admin._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllAdmin = async (req, res) => {
    const customers = await adminModel.find({}).sort({createdAt: -1})
    res.status(200).json(customers)
}

export {loginAdmin, getAllAdmin}