import connectionHandler from "@/app/utils/db";
import { SignUp } from "../../types/types";
import cloudinary from "cloudinary";

export const POST = async (request: SignUp) => {
  connectionHandler();

  const { firstName, lastName, email, password, dob, gender, image } =
    await request.json();
  // const cloudinaryResponse = await cloudinary.v2.uploader.upload(image, {
  //   folder: "your_upload_folder",
  //   // Other Cloudinary upload options can be added here
  // });
  const user = {
    firstName,
    lastName,
    email,
    password,
    dob,
    gender,
    image,
  };

  console.log(user);

  const response = Response.json({
    data: user,
    message: "user created",
    status: 200,
  });
  return response;
};
