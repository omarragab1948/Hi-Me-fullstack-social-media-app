import connectionHandler from "@/app/utils/db";
import uploadImage from "@/app/utils/firebaseUploader";
import User from "@/app/utils/models";

export const DELETE = async (request: Request) => {
  const searchParams = new URL(request.url);
  const userId = searchParams.pathname.split("/")[5];
  const existUser = await User.findById(userId);

  if (!existUser) {
    return Response.json({ message: "User doesn't exist", status: 400 });
  }

  connectionHandler();

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $unset: { coverImage: "" } },
    { new: true }
  );

  return Response.json({ data: updatedUser, status: 200 });
};
