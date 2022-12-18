import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name:String,
  gender:String,
  size:String,
  color:String,
  price:Number,
  picture:String
})

export default mongoose.model("products" , productSchema)