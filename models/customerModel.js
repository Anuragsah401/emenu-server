import mongoose from "mongoose";

import {customerSchema} from './Schema/customerSchema.js'

export default mongoose.model('customer', customerSchema)