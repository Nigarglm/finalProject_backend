import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    poster:{
        type: String,   
        required: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    trailer:{
        type: String,    
        required: true
    },
    video:{
        type: String,      
        required: true
    },
    description:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    duration:{
        type: Number,       
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    main_actors:{
        type: String,
        required: true
    },
    comments:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
