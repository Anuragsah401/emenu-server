import bcrypt from "bcrypt";

const password = "12345";
const saltRounds = 10;

const hash = await bcrypt.hash(password, saltRounds);
console.log(hash);