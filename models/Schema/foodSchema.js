import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodSchema = new Schema({
   
    img: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true,
    }
},{timestamps: true})

export {foodSchema}