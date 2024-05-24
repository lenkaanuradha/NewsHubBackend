import Comment from "../models/Comment.js";

export const commentNews = async (req, res) => {
  try {
    console.log(req.body);
    const newComment = new Comment({
      author: req.body.author,
      desc: req.body.desc,
      post: req.params.news_id,
    });
    await newComment.save();

    res.status(200).json({ success: "true" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: "false" });
  }
};
export const deleteComment = async (req, res) => {
  
  try {
   
      await Comment.findByIdAndDelete(req.params.comment_id);
    
      res.status(500).json({ success: "false" });
    
  } catch (error) {
    console.log(error);
   
    res.json({ success: "false" });
  }
};
export const updateComment = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.comment_id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ success: "true", updatedComment: updatedComment });
  } catch (error) {
    console.log(error);
    res.json({ success: "false" });
  }
};
