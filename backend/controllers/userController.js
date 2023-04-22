import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const authUser = asyncHandler(async (req, res) => {
 
  const user = await User.findOne({ email:req.body.email});
  console.log(user,"jihuhuuh")
  console.log("email:", req.body.email);
console.log(req.body);

  

  if (user && (await user.matchPassword(req.body.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null
    }
    );
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

});

