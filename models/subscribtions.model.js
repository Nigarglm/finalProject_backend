import mongoose from "mongoose";

const SubscribtionsSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  price:{
    type: Number,  
    required: true
  },
  describtion:{
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  }
});

export const Subscribtions = mongoose.model("Subscribtions", SubscribtionsSchema);

export default Subscribtions;