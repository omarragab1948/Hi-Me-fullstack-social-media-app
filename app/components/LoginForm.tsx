"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { LoginInputs } from "../types/types";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "../services/apiHandler";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../rtk/userSlice";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const [error, setError] = useState("");
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    const res = await signIn(user);
    if (res.status !== 200) {
      setError(res.message);
    } else {
      setError("");
      setUserId(res.data._id);
      dispatch(setUser(res.data));
    }
  };
  if (userId) {
    router.push(`/home/profile/${userId}`);
  }
  const [show, setShow] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 p-6  rounded-md shadow-md px-4  shadow-slate-400"
    >
      {error && (
        <span className="text-red-500 text-2xl text-center mt-1 mx-auto w-full block">
          {error}
        </span>
      )}
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="email"
      >
        Email
      </label>
      <input
        {...register("email", { required: true })}
        type="email"
        className="w-full px-4 py-2 border border-solid border-slate-300  rounded-md focus:outline-none focus:border-primary "
      />
      <span
        className={`text-red-500 opacity-0 ${
          errors.email && "opacity-100"
        }   duration-300 `}
      >
        Email is required
      </span>

      <label
        className="block mt-4 text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <div className="relative">
        <input
          {...register("password", { required: true })}
          type={show ? "text" : "password"}
          className="w-full px-4 py-2 border border-solid border-slate-300  rounded-md focus:outline-none focus:border-primary "
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <span
        className={`text-red-500 opacity-0 ${
          errors.password && "opacity-100"
        } duration-300`}
      >
        Password is required
      </span>

      <button
        type="submit"
        className="mt-6 bg-primary text-white px-4 py-2 w-full rounded-md hover:bg-primary focus:outline-none focus:shadow-outline-purple"
      >
        Log in
      </button>

      <div className="mt-4 text-sm">
        Don't have an account?
        <Link href="/signup" className="text-primary hover:underline">
          Sign up here
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
