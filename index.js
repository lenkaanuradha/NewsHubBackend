import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./Routes/authRoute.js";
import newsRoute from "./Routes/newsRoute.js";
import commentsRoute from "./Routes/commentsRoute.js";
import usersRoute from "./Routes/usersRoute.js";
import { countLikesNews } from "./controllers/News.js";
const app = express();
dotenv.config();

main().catch(err=>{
    console.log(err)
})

async  function main (){
    await mongoose.connect(process.env.MONGO_URL)

}
mongoose.connection.on("disconnected" , ()=>{
    console.log("mongoDB disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected")
})
app.use(express.json())
app.use(cors());

app.use('/backend/auth',authRoute);
app.use('/backend/news',newsRoute);

app.use('/backend/users',usersRoute);
app.use((req,res,next)=>{
    const auth = req.headers
    console.log(req.headers.authorization)
    if(!auth?.authorization)
      {
        var err = new Error('Not authorized! Go back!');
        err.status = 401;
       return next(err);
      }
      else{
       
       
        next();
         
      }
  })
 
  app.use('/backend/comments',commentsRoute);
  app.use('/backend/news/:action/:news_id',countLikesNews);
app.listen(8800,()=>{
    console.log("connected to backend");
})