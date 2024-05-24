import  express  from "express";
const router = express.Router();
import {news,getNewsById,getAllNews,deleteNewsById,updateNewsById,ratingCount} from "../controllers/News.js";
//post news
router.post('/postnews', news);
//get all comments of a single news
router.get('/getnewswithcomments/:news_id', getNewsById);
//get all news
router.get('/getallnews', getAllNews)
//delete news
router.delete('/delete/:news_id', deleteNewsById);
//update news By Id
router.put('/update/:news_id', updateNewsById);
//count no of likes for a single news


//rating 
router.post('/rating/:news_id/:user_id', ratingCount)
//count overall rating of single news
// router.get('/overallrating/:news_id', overallRatingCount)
export default router;
