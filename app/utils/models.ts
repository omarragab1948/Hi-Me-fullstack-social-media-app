import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  email: {
    type: String,
    ref: "User",
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
  },
  degree: {
    type: String,
  },
  graduationYear: {
    type: String,
  },
});

const aboutSchema = new mongoose.Schema({
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  education: [educationSchema],
});

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
});

const commentSchema = new mongoose.Schema({
  userImage: {
    type: String,
    ref: "User",
  },
  text: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const emotionSchema = new mongoose.Schema({
  userImage: {
    type: String,
    ref: "User",
  },
  text: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  images: [imageSchema],
  timestamp: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
  emotions: [emotionSchema],
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
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
  profileImage: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  about: aboutSchema,
  friends: [friendSchema],
  uploadedImages: [imageSchema],
  posts: [postSchema],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
