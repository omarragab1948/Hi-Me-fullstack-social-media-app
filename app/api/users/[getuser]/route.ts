import connectionHandler from "@/app/utils/db";
import User from "@/app/utils/models";

export const GET = async (request: Request) => {
  const searchParams = new URL(request.url);
  connectionHandler();
  const user = await User.findById(searchParams.pathname.split("/")[3]);
  return Response.json({ data: user, status: 200 });
};
