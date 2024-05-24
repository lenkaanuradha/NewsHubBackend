import Users from "../models/Users.js";


export const getUser = async (req, res, next) => {

  try {
    const user = await Users.findById(req.params.user_id);
    res.status(200).json({success:"true",user:user});;
  } catch (error) {
    console.log(error)
    res.json({success:"false"});
  }
};
export const getAllUsers = async (req, res, next) => {
 
  try {
   
  const allUsers = await Users.find({})
  
 res.status(200).json({success:"true", allUsers:allUsers});;
  } catch (error) {
   
    
    res.status(500).json({success:"false", error:error});
  }
};
export const deleteUser = async (req, res, next) => {
  try {
     await Users.findByIdAndDelete(req.params.user_id);
   
   
   
    res.status(200).json({ success: "true", msg:"User got deleted successfully" });
  } catch (error) {
    console.log(error)
    res.json({ success: "false" });
    
  }
};
export const updateUserById = async (req, res, next) => {
  console.log("backend")
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.params.user_id, {$set : req.body},{new:true});
    console.log(updatedUser)

    res.status(200).json({ success: "true" , updatedUser:updatedUser});
  } catch (error) {
    console.log(error)
    res.json({ success: "false" });
    
  }
};
