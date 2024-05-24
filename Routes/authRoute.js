import  express  from "express";
const router = express.Router();
import {  body } from 'express-validator';
import { login , createUser} from "../controllers/auth.js"


router.get('/',(req,res)=>{
    console.log("auth end point");
})
router.post('/login',login);
router.post('/register',[
body('useremail').isEmail(),
body('password','Length of password should be of atleast 5 characters').isLength({min:5})
],createUser);
export default router;
