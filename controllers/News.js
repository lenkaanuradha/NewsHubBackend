import News from "../models/News.js";
import Comment from "../models/Comment.js";
import Rating from "../models/Rating.js";
export const news = async (req, res) => {
  try {
    const newNews = new News({
      title: req.body.title,
      desc: req.body.desc,
      likes_count: 0,
    });
    await newNews.save();
    res.status(200).json({ success: "true" });
  } catch (error) {
    res.status(500).json({ success: "false" });
  }
};
export const getNewsById = async (req, res) => {
  try {
    const news_id = req.params.news_id;
    const newsObject = await News.findById(news_id);
    const comments = await Comment.find({ post: news_id });

    res
      .status(200)
      .json({ success: "true", newsObject: newsObject, comments: comments });
  } catch (error) {
    console.log(error);
    res.json({ success: "false" });
  }
};
export const getAllNews = async (req, res) => {
  let allRating = [];
  let commentsCount = [];
  try {
    const allNews = await News.find({});

    for (const index in allNews) {
      try {
        const newsid = allNews[index]._id;
        const ratingObjects = await Rating.find({ newsid: newsid });
        const allCommentsObjects = await Comment.find({ post: newsid });

        commentsCount += allCommentsObjects.length;
        console.log(commentsCount);
        let sum = 0;

        let avgRating = 0;

        if (ratingObjects.length !== 0) {
          for (const ratingobject of ratingObjects) {
            sum += ratingobject.rating;
          }
          avgRating = sum / ratingObjects.length;
        }
        allRating += avgRating;
      } catch (error) {
        console.log(error);
        res.json({ success: "false" });
      }
    }
    res
      .status(200)
      .json({
        success: "true",
        allNews: allNews,
        allRating: allRating,
        commentsCount: commentsCount,
      });
  } catch (error) {
    console.log(error);
    res.json({ success: "false" });
  }
};
export const deleteNewsById = async (req, res, next) => {
  try {
    await News.findByIdAndDelete(req.params.news_id);

    const comments = await Comment.find({ post: req.params.news_id });
    for (const comment of comments) {
      await Comment.findByIdAndDelete(comment._id);
    }
    res.status(200).json({ success: "true" });
  } catch (error) {
    console.log(error);

    res.json({ success: "false" });
  }
};
export const updateNewsById = async (req, res, next) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.news_id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ success: "true", updatedNews: updatedNews });
  } catch (error) {
    console.log(error);
    res.json({ success: "false" });
  }
};
export const countLikesNews = async (req, res,next) => {

  try {
  
    const action = req.params.action;

    const counter = action === "Like" ? 1 : -1;
    const updatedLikesCount = await News.findByIdAndUpdate(
      req.params.news_id,
      { $inc: { likes_count: counter } },
      { new: true }
    );
    const likecount = updatedLikesCount.likes_count;
 
    res.status(200).json({ success: "true", updatedLikesCount: likecount });
  } catch (error) {
    console.log(error);
   
    res.status(500).json({ success: "false" , error:error});
  }
};
export const ratingCount = async (req, res, next) => {
  try {
    const newRating = new Rating({
      newsid: req.params.news_id,
      rating: req.body.rating,
      user: req.params.user_id,
    });
    await newRating.save();

    res.status(200).json({ success: "true", newRating: newRating });
  } catch (error) {
    console.log(error);
    res.json({ success: "false" });
  }
};
// export const overallRatingCount = async (req, res, next) => {
//   // try {
//   //     const newsid = req.params.news_id;
//   //     const ratingObjects = await Rating.find({newsid:newsid});
//   //    let sum=0;

//   //    let avgRating=0;

//   //    if(ratingObjects.length !== 0){
//   //     for(const ratingobject of ratingObjects){
//   //      sum+=ratingobject.rating;

//   //     }
//   //    avgRating = sum/ratingObjects.length;
//   //   }

//   //   res.status(200).json({ success: "true" , avgRating:avgRating });
//   // } catch (error) {
//   //   console.log(error)
//   //   res.json({ success: "false" });

//   // }
// };
