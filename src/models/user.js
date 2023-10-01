import mongoose from "mongoose";

const Address = new mongoose.Schema({
  address: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  pincode: {
    type: String,
    trim: true,
    required: true,
    minLength: 6,
  },
});

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    trim: true,
    minLength: [8, "Password must of minimum 8 length"],
    required: true,
  },
  name: {
    type: String,
    trim: true,
    minLength: 4,
    required: true,
  },
  // deliveryAddresses: [Address],
  deliveryAddresses: [{ type: Address }],
  mobileNumbers: [
    {
      type: String,
      trim: true,
      minLength: 10,
      required: true,
    },
  ],
});

export const User = mongoose.model("users", UserSchema);
