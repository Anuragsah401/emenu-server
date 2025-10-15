import mongoose from "mongoose";

import {adminSchema} from './Schema/adminSchema.js'

export default mongoose.model('admins', adminSchema)