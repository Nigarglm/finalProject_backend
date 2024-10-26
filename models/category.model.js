import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  image:{
    type: String,  
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export const Category = mongoose.model("Category", CategorySchema);

export default Category;