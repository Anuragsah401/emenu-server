import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import {createServer} from "http";

import {Server} from "socket.io";


import foodRoutes from "./routes/foodRoutes.js";
import todaysSpecialRoutes from "./routes/dashboardFoodRoutes/todaysSpecialFoodRoutes.js";
import mostPupularFoodRoutes from "./routes/dashboardFoodRoutes/mostPupularFoodRoutes.js";
import recommendedFoodRoutes from "./routes/dashboardFoodRoutes/recommendedFoodRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import kitchenRoutes from "./routes/kitchenRoutes.js";
import orderListRoutes from "./routes/orderListRoutes.js";

mongoose.set("strictQuery", true);
dotenv.config();


const app = express()
const http = createServer(app);

export const io = new Server(http, {
  cors: {
    origin: "*"
  }
});

io.on('connection', socket => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


//middle ware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: "*"
}));
app.use('/', express.static('images'));


app.use("/api/todaysspecial", todaysSpecialRoutes)
app.use("/api/mostpopularfood", mostPupularFoodRoutes)
app.use("/api/recommendedfood", recommendedFoodRoutes)
app.use("/api/customer", customerRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/kitchen", kitchenRoutes)
app.use("/api/orderlist", orderListRoutes)
app.use("/api/food", foodRoutes)


mongoose
  .connect(process.env.MONGOCONNECT)
  .then(() => {
    http.listen(process.env.PORT, () => {
      console.log("Connected to data base and listening to", process.env.PORT);
    });
    
  })
  .catch((err) => {
    console.log(err);
  });
