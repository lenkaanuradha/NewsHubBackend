import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
    newsid:{
     type:mongoose.Schema.Types.ObjectId,
    ref:'News'
   },
   rating:{
    type:Number,
    default:0
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Users'
   }
  
   

},{timestamps:true})

export default mongoose.model("Rating",RatingSchema)