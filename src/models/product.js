import mongoose from "mongoose";

const productDescriptionItemSchema = new mongoose.Schema({
  type: {
    type: String,
    /**
     * This type field can only take the values in the array
     * In case any other value is provided,
     * Otherwise, will result in error.
     */
    enum: ["para", "list"],
    required: true,
    trim: true,
  },
  content: {
    type: Object,
    required: true,
  },
});

const productReviewSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  userID: {
    type: String,
    required: true,
  },
  starsGiven: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    trim: true,
  },
  whenReviewed: {
    type: String,
    required: true,
  },
});

export const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    trim: true,
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
    min: 1,
  },
  images: [{ type: String, trim: true }],
  description: [{ type: productDescriptionItemSchema }],
  deliveryInfo: [{ type: productDescriptionItemSchema }],
  careInstructions: [{ type: productDescriptionItemSchema }],
  discountInPercent: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    required: true,
    type: Number,
    min: 0,
  },
  deliveryCharges: {
    required: true,
    type: Number,
  },
  starRatings: { type: Number },
  reviews: [{ type: productReviewSchema }],
});

export const Product = mongoose.model("products", productSchema);
