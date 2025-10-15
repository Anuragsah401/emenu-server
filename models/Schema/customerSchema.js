import mongoose from "mongoose";

import bcrypt from "bcrypt"

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    activeStatus: {
        type: String,
        required: true,
        default: "offline"
    },
    battryPercent: {
        type: Number,
        require: true,
        default: 0
    }
    
},{timestamps: true})

customerSchema.statics.login = async function (username, password) {
    if(!username || !password){
        throw Error("fillup username and password")
    }

    const customer = await this.findOne({username})

    if (!customer){
        throw Error("invalid username")
    }

    const match =  await bcrypt.compare(password, customer.password)

    if(!match){
        throw Error("password mismatch")
    }

    return customer
}

customerSchema.statics.createUser = async function (username, password) {

    // validation
    if(!username || !password){
        throw Error("fillup username and password")
    }

    const exists = await this.findOne({username})

    if (exists){
        throw Error("user/customer already exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const customer = await this.create({username, password: hash})

    return customer
}


// customerSchema.statics.updateUser = async function (username, password) {

//     // validation
//     if(!username || !password){
//         throw Error("fillup username and password")
//     }

//     const exists = await this.findOne({username})

//     if (exists){
//         throw Error("username already exist")
//     }

//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password, salt)

//     const customer = await this.create({username, password: hash})

//     return customer
// }



export {customerSchema}