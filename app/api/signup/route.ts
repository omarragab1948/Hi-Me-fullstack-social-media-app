import connectionHandler from "@/app/utils/db";
import { SignUp } from "../../types/types";
import User from "@/app/utils/models";
import bcrypt from "bcryptjs"; //
import uploadImage from "@/app/utils/firebaseUploader";

export const POST = async (request: any) => {
  connectionHandler();
  const body = await request.formData();
  const firstName = body.get("firstName");
  const lastName = body.get("lastName");
  const email = body.get("email");
  const password = body.get("password");
  const gender = body.get("gender");
  const image = body.get("image");
  const dob = body.get("dob");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return Response.json({ message: "Invalid email address", status: 400 });
  }

  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return Response.json({ message: "User already exists", status: 400 });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const uploaded = await uploadImage(image);
  const user = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    dob,
    gender,
    profileImage: uploaded,
    coverImage: "",
    friends: [],
    uploadedImages: [],
    posts: [],
    about: {},
  };

  const createdUser = await User.create(user);
  const response = Response.json({
    data: createdUser,
    message: "User created",
    status: 200,
  });
  return response;
};
