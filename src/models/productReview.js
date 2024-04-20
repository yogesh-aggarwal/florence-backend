import mongoose from "mongoose";

const productReviewSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  userID: {
    type: String,
    required: true,
    trim: true,
  },
  starsGiven: {
    type: Number,
    required: true,
    min: 0,
  },
  review: {
    type: String,
    required: true,
    trim: true,
    min: 0,
  },
  whenReviewed: {
    type: Date,
    required: true,
    trim: true,
  },
  userName:{
    type:String,
    required:true,
    trim:true,
  }
});

export const ProductReview = mongoose.model(
  "productReviews",
  productReviewSchema
);
