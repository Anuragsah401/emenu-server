import mongoose from "mongoose";

import { foodListSchema } from "./Schema/orderListSchema.js";

const orderListModel = mongoose.model("orderLists", foodListSchema);

export default orderListModel;
