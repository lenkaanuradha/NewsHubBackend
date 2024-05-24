import  express  from "express";
const router = express.Router();
import {getUser,getAllUsers,deleteUser,updateUserById } from "../controllers/users.js";
//get user  by id
router.get('/getuser/:user_id', getUser)
//get all users
router.get('/getallusers', getAllUsers)
//delete user
router.delete('/deleteUser/:user_id', deleteUser);
//update user By Id
router.put('/updateUser/:user_id', updateUserById);

export default router;
