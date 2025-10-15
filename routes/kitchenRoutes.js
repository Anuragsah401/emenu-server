import express from "express";
import {loginKitchen, getAllKitchen} from "../controllers/kitchenController.js";

const router = express.Router();

router.post("/loginkitchen", loginKitchen)
router.get("/", getAllKitchen)


export default router