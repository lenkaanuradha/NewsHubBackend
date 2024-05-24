import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {  validationResult } from 'express-validator';
import createError from "http-errors";

export const createUser = async (req, res, next) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.send({ errors: errors.array() });
    }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      useremail: req.body.useremail,
      password: hash,
      
    });
    await newUser.save();
    res.status(200).json({success:"true"});
  } catch (error) {
    res.json({success:"false"});
  }
};
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).json({msg:"User not found!"});
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return  res.status(400).json({msg:"Password does not match"});
        }
       
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
        const { password, isAdmin,username, ...otherDetails } = user._doc;
       
        res.status(200).json({ details: { ...otherDetails },success:"true", isAdmin:isAdmin , token:token , username:username});
      }
       catch (error) {
        next(error);
    }
}