import User from "@/app/utils/models";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { email, password } = await request.json();
  console.log(email);
  const existUser = await User.findOne({ email: email });

  if (!existUser) {
    const response = Response.json({
      message: "User doesn't Exist",
      status: 401,
    });
    return response;
  }

  const match = await bcrypt.compare(password, existUser.password);

  if (match) {
    const response = Response.json({
      message: "Logged in",
      data: existUser,
      status: 200,
    });
    return response;
  } else {
    const response = Response.json({
      message: "Invalid password",
      status: 401,
    });
    return response;
  }
};
