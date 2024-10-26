import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
  bg_image: {
    type: String,  
    required: true,
  },
  text: {
    type: String, 
    required: true,
  }
});

export const Hero = mongoose.model("Hero", HeroSchema);

export default Hero;