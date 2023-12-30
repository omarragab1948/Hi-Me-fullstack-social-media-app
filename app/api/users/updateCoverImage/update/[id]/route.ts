import connectionHandler from "@/app/utils/db";
import { storage } from "@/app/utils/firebaseConfig";
import User from "@/app/utils/models";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const PUT = async (request: Request) => {
  const body = await request.formData();
  const image = body.get("coverImage");
  const searchParams = new URL(request.url);
  const userId = searchParams.pathname.split("/")[5];
  const existUser = await User.findById(userId);
  if (!existUser) {
    return Response.json({ message: "User dosn't exists", status: 400 });
  }
  connectionHandler();
  const uploadImage = async (image) => {
    console.log("Uploading image", image);
    try {
      console.log("Uploading image...");
      const imageRef = ref(storage, `images/${v4()}`);
      const uploaded = await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error.code, error.message);
      return { error: error.message };
    }
  };
  const coverImage = await uploadImage(image);

  if (coverImage) {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { coverImage: coverImage } },
      { new: true }
    );

    console.log(updatedUser);

    return Response.json({ data: updatedUser, status: 200 });
  } else {
    return Response.json({
      message: "Error uploading cover image",
      status: 500,
    });
  }
};
