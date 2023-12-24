import axios from "axios";
import { UserType } from "../types/types";
export const signUp = async (user: any) => {
  console.log(user);
  try {
    const res = await axios.post("/api/signup", user);
    return res.data;
  } catch (er) {
    throw er;
  }
};
