import express from "express";
import {loginAdmin, getAllAdmin} from "../controllers/adminController.js";


const router = express.Router();

router.post("/loginadmin", loginAdmin)
router.get("/", getAllAdmin)


export default router