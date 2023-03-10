import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:String,
  phone:String,
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})

export default mongoose.model("users" , userSchema);