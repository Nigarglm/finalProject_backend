import mongoose from "mongoose";

const LogoSchema = new mongoose.Schema({
  image: {
    type: String,     
    required: true,
  }
});

export const Logo = mongoose.model("Logo", LogoSchema);

export default Logo;