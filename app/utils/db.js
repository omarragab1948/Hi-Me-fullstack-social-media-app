import mongoose from "mongoose";

const connectionHandler = async () => {
  const dbUrl = process.env.MongoDB;

  try {
    const res = await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
  } catch (err) {
    throw err;
  }
};
export default connectionHandler;
