import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// middleware

app.use(express.json());
dotenv.config();
app.use(cors({
  origin:"*"
}))

// env variables

const port = process.env.PORT || 5000;
const url = process.env.URL;

// connecting to mongoDB

mongoose.connect(url)
.then(()=>{console.log("connected to mongoDB !")})
.catch((err)=>{console.error(err)})

// launching the app

app.listen(port , ()=>{
  console.log(`listening to requests on port ${port}`);
})

// handling routes

app.use("/products" , productRoutes);
app.use("/auth" , authRoutes);

