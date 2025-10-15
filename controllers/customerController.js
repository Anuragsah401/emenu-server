// it holds all the function that will manupulated
//for eg: function to delete user based on it
//        function to create user

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import customerModel from "../models/customerModel.js";
import bcrypt from "bcrypt";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

const loginCustomer = async (req, res) => {
  const { username, password } = req.body;

  try {
    const customer = await customerModel.login(username, password);

    // crate Token
    const token = createToken(customer._id);

    const id = customer._id;

    res.status(200).json({ username, token, id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createCustomer = async (req, res) => {
  const { username, password } = req.body;

  try {
    const customer = await customerModel.createUser(username, password);

    // crate Token
    const token = createToken(customer._id);

    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllCustomer = async (req, res) => {
  const customers = await customerModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(customers);
};

// get one food item from backery
const getOneCustomer = async (req, res) => {
  const { id } = req.params;
  const food = await customerModel.findOne({ _id: id });
  res.status(200).json(food);
};

const updateCustomer = async (req, res) => {
  const updatedCustomer = req.body


  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "cannot update Invalid User" });
    }

    const updateCutomerList = await customerModel.updateOne(
      { _id: id },
      { $set: updatedCustomer }
    );

    if (!updateCutomerList) {
      return res.status(404).json({ errors: "No such user found to update" });
    }

    res.status(200).json(updateCutomerList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUserNameAndPassword = async (req, res) => {
   const { username, password } = req.body;

   const { id } = req.params;

   try {
 
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password, salt);
 
     if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({ error: "cannot update Invalid User" });
     }
 
     const updateCutomerList = await customerModel.updateOne(
       { _id: id },
       { $set:  {username, password:hash}}
     );
 
     if (!updateCutomerList) {
       return res.status(404).json({ errors: "No such user found to update" });
     }
 
     res.status(200).json(updateCutomerList);
   } catch (err) {
     res.status(400).json({ error: err.message });
   }
}



const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "cannot delete Invalid id" });
  }

  const deletedCustomer = await customerModel.findOneAndDelete({ _id: id });

  if (!deletedCustomer) {
    return res
      .status(404)
      .json({ errors: "No such customer/user found to delete" });
  }

  res.status(200).json(deletedCustomer);
};

export {
  loginCustomer,
  createCustomer,
  getAllCustomer,
  deleteCustomer,
  updateCustomer,
  getOneCustomer,
  updateUserNameAndPassword
};
