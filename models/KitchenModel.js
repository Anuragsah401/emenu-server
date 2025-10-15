import mongoose from "mongoose";

import {kitchenSchema} from './Schema/kitchenSchema.js'

export default mongoose.model('kitchens', kitchenSchema)