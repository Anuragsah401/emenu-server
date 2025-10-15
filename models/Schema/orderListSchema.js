import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodListSchema = new Schema(
  {
    foodList: [
      {
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
        amount: {
          type: Number,
          require: true,
        },
        available: {
          type: Boolean,
          default: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    tableNo: {
      type: String,
      require: true,
    },
    orderStatus: {
      type: String,
      require: true,
      default: "pending",
    },
    isCheckout: {
      type: Boolean,
      default: false,
    },
    timer: {
      type: Number,
      default: 120,
    },
    isCanceled: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export { foodListSchema };
