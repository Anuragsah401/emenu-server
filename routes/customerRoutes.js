import express from "express";

const router = express.Router();

import {loginCustomer, createCustomer, getAllCustomer, getOneCustomer, deleteCustomer, updateCustomer, updateUserNameAndPassword} from "../controllers/customerController.js"

router.get("/", getAllCustomer)
router.post("/logincustomer", loginCustomer)
router.post('/createcustomer', createCustomer)
router.delete('/:id', deleteCustomer)
router.get('/:id', getOneCustomer)

// update food order list
router.patch('/updatecustomer/:id', updateCustomer)
router.patch('/updateusernameandpassword/:id', updateUserNameAndPassword)

export default router