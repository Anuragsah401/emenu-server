import mongoose from "mongoose";

import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
});

adminSchema.statics.login = async function (email, password) {
 
  if (!email || !password) {
    throw Error("fillup email and password");
  }

  const admin = await this.findOne({ email });

  console.log(admin)    

  if (!admin) {
    throw Error("invalid admin");
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    throw Error("password mismatch");
  }

  return admin;
};

export { adminSchema };


