import mongoose from "mongoose";

import {foodSchema} from '../Schema/foodSchema.js'


export default mongoose.model('most popular food', foodSchema)