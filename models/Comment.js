import mongoose from 'mongoose';
const CommentSchema = new mongoose.Schema({
   author:{
        type:String,
        required:true,
        unique: false
       
    },
    desc:{
      type:String,
      required:true,
     
  },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News'
   }
  
   

},{timestamps:true})

export default mongoose.model("Comment",CommentSchema)