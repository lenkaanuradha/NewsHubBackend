import  express  from "express";
const router = express.Router();
import {commentNews, deleteComment ,updateComment} from "../controllers/commentNews.js";

router.post('/createcomment/:news_id', commentNews);
router.delete('/delete/:comment_id', deleteComment);
router.put('/update/:comment_id', updateComment);


export default router;
