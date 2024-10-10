const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const {generateToken} =require("../confi/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log("req:",req.body);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please enter all feilds");
  } else {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("email already Exists");
    }
    else{
        const user = await User.create({
            name,
            email,
            password,
            pic
        })

        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                Token:generateToken(user._id)
            });
            
        }
        else{
            res.status(400);
            throw new Error("user not found");
        }
    }
  }
});

const authUser =asyncHandler(async(req,res)=>{
    const {email,password} =req.body;
    console.log("loggin",req.body.email);
    let user = await User.findOne({email});
    
     
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    }
    else{
      throw new Error("!WRONG PASSWORD");
    }
}
) 
module.exports ={registerUser,authUser};
