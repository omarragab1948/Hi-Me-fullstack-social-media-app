import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String, // Use the String constructor for the type
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema) || models.User;

export default User;
