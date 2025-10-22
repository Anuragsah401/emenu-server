import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import foodRoutes from "./routes/foodRoutes.js";
import todaysSpecialRoutes from "./routes/dashboardFoodRoutes/todaysSpecialFoodRoutes.js";
import mostPopularFoodRoutes from "./routes/dashboardFoodRoutes/mostPupularFoodRoutes.js";
import recommendedFoodRoutes from "./routes/dashboardFoodRoutes/recommendedFoodRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import kitchenRoutes from "./routes/kitchenRoutes.js";
import orderListRoutes from "./routes/orderListRoutes.js";

mongoose.set("strictQuery", true);
dotenv.config();

const app = express();
const server = createServer(app);

// ✅ Allow CORS for your Netlify frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",      // local dev
      "https://emenu-emil.netlify.app" // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Setup Socket.IO with the same CORS policy
export const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://emenu-emil.netlify.app"
    ],
    methods: ["GET", "POST"],
  },
});

// ✅ Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
  });
});

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static('images'));

// ✅ Routes
app.use("/api/todaysspecial", todaysSpecialRoutes);
app.use("/api/mostpopularfood", mostPopularFoodRoutes);
app.use("/api/recommendedfood", recommendedFoodRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/kitchen", kitchenRoutes);
app.use("/api/orderlist", orderListRoutes);
app.use("/api/food", foodRoutes);

// ✅ MongoDB and server start
mongoose
  .connect(process.env.MONGOCONNECT)
  .then(() => {
    const PORT = process.env.PORT || 10000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
