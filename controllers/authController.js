import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function signIn(req,res){
  const { email , password } = req.body;
  
  try{

    const exists = await User.findOne({email});

    if(!exists)
    {
      return res.status(400).json({
        msg:"User with the given email doesn't exist"
      })
    }
    else
    {
      const match = await bcrypt.compare(password , exists.password);

      if(!match)
      {
        return res.status(401).json({
          msg:"Wrong password"
        })
      }
      else
      {
        return res.status(200).json({
          token:createToken(exists.email , exists._id , exists.name , exists.phone),
          email:exists.email,
          msg:"Success"
        })
      }

    }

  }catch(err){
    return res.status(400).json({
      msg:"Error while signing in"
    })
  }
}

export async function signUp(req,res){
  const { name , phone , email , password } = req.body;

  try{
    const exists = await User.findOne({email});

    if(exists)
    {
      return res.status(400).json({
        msg:"User with the given email already exists"
      })
    }
    else
    {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password , salt);

      await User.create({
        name,
        phone,
        email,
        password:hashedPassword
      })

      return res.status(201).json({
        msg:"User created successfully"
      })
    }
    
  }catch(err){
    return res.status(400).json({
      msg:"Error while signing up"
    })
  }
}

function createToken(email , id , name , phone)
{
  return jwt.sign( {email,id,name,phone} , process.env.JWT_SECRET  , {expiresIn:"30d"})
}