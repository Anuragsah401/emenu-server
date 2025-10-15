import mongoose from "mongoose";

import orderListModel from "../models/orderListModel.js";

import {io} from "../app.js";

// get all most popular food itemsorderListModel
const getAllOrderListFood = async (req, res) => {
    const food = await orderListModel.find({}).sort({createdAt: -1})
    res.status(200).json(food)
}


// create a new workout
const createOrderListFood = async (req, res) => {
    const documents = req.body;

    // add doc to db
    try {
      const specialFood = await orderListModel.insertMany(documents);
      io.emit('new order', specialFood);
      res.status(200).json(specialFood);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

const getOneOrderList = async (req, res) => {
    const { id } = req.params;
    const food = await orderListModel.findOne({ _id: id });
    res.status(200).json(food);
  };

const updateOrderListFood = async (req, res) => {
    const updatedOrderList = req.body
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'cannot update Invalid id'})
    }

    const updateListFood = await orderListModel.updateOne({_id:id}, {$set: updatedOrderList})
    const order = await orderListModel.findByIdAndUpdate(id, updatedOrderList);
    io.emit('update order', order);

    if(!updateListFood){
        return res.status(404).json({errors: "No such food found to update"})
    }

    res.status(200).json(updateListFood)
}

const updateCanceledOrder = async (req, res) => {
    const updatedOrderList = req.body
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'cannot update Invalid id'})
    }

    const updateListFood = await orderListModel.updateOne({_id:id}, {$set: updatedOrderList})
    const order = await orderListModel.findByIdAndUpdate(id, updatedOrderList);
    io.emit('update canceled order');

    if(!updateListFood){
        return res.status(404).json({errors: "No such food found to update"})
    }

    res.status(200).json(updateListFood)
}



// delete a most popular food
const deleteOrderListFood  = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'cannot delete Invalid id'})
    }

    const deletedOrderListFood = await orderListModel.findOneAndDelete({_id:id})

    if(!deletedOrderListFood){
        return res.status(404).json({errors: "No such food found to delete"})
    }

    res.status(200).json(deletedOrderListFood)
    
}

export {getAllOrderListFood, createOrderListFood, deleteOrderListFood, updateOrderListFood, getOneOrderList, updateCanceledOrder}