import mongoose from "mongoose";

import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const kitchenSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

kitchenSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("fillup email and password");
  }

  const kitchen = await this.findOne({ email });   

  if (!kitchen) {
    throw Error("invalid kitchen user");
  }

  const match = await bcrypt.compare(password, kitchen.password);

  if (!match) {
    throw Error("password mismatch");
  }

  return kitchen;
};

export { kitchenSchema };
