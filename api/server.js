import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.set("strictQuery", true);

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.listen(8800, () => {
  Connect(),
  console.log("Server is running on port 8800");
});
