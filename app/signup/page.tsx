"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignupInputs } from "../types/types";
import { signUp } from "../services/apiHandler";
import {
  CldUploadButton,
  CldUploadWidgetResults,
  CldImage,
} from "next-cloudinary";
import { useState } from "react";

const SignupForm: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>();

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      dob: data.dob,
      gender: data.gender,
      image: imageUrl,
    };
    const res = await signUp(user);
    console.log(res);
  };
  const handleImageUpload = (result: CldUploadWidgetResults) => {
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 p-6 rounded-md shadow-md px-4 shadow-slate-400"
    >
      <div className="flex flex-wrap -mx-2">
        <div className="w-full flex flex-col px-2 mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Profile Image
          </label>
          <div className="w-full flex justify-between items-center">
            <CldUploadButton
              uploadPreset="baz6ednq"
              onUpload={handleImageUpload}
              className="mt-6 bg-primary text-white px-4 py-2  rounded-md hover:bg-primary focus:outline-none focus:shadow-outline-purple"
            ></CldUploadButton>
            {imageUrl && (
              <div className="rounded-full  w-40 h-40">
                <CldImage
                  width={1000}
                  height={1000}
                  className="w-full h-full rounded-full"
                  src={imageUrl || ""}
                  alt="Description of my image"
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 px-2 mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            {...register("firstName", { required: true })}
            type="text"
            className="w-full px-4 py-2 border border-solid border-slate-300 rounded-md focus:outline-none focus:border-primary"
          />
          {errors.firstName && (
            <span className="text-red-500 block text-sm mt-1">
              First Name is required
            </span>
          )}
        </div>

        {/* Repeat the pattern for other input groups */}

        <div className="w-full md:w-1/2 px-2 mb-4">
          <label
            className="block  text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            {...register("lastName", { required: true })}
            type="text"
            className="w-full px-4 py-2 border border-solid border-slate-300 rounded-md focus:outline-none focus:border-primary"
          />
          {errors.lastName && (
            <span className="text-red-500 block text-sm mt-1">
              Last Name is required
            </span>
          )}
        </div>

        {/* Repeat the pattern for other input groups */}

        <div className="w-full md:w-1/2 px-2 mb-4">
          <label
            className="block mt-4 text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
            type="email"
            className="w-full px-4 py-2 border border-solid border-slate-300 rounded-md focus:outline-none focus:border-primary"
          />
          {errors.email && (
            <span className="text-red-500 block text-sm mt-1">
              Invalid Email
            </span>
          )}
        </div>

        {/* Repeat the pattern for other input groups */}

        <div className="w-full md:w-1/2 px-2 mb-4">
          <label
            className="block mt-4 text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            className="w-full px-4 py-2 border border-solid border-slate-300 rounded-md focus:outline-none focus:border-primary"
          />
          {errors.password && (
            <span className="text-red-500 block text-sm mt-1">
              Password is required
            </span>
          )}
        </div>

        {/* Repeat the pattern for other input groups */}

        <div className="w-full md:w-1/2 px-2 mb-4">
          <label
            className="block mt-4 text-gray-700 text-sm font-bold mb-2"
            htmlFor="dob"
          >
            Date of Birth
          </label>
          <input
            {...register("dob", { required: true })}
            type="date"
            className="w-full px-4 py-2 border border-solid border-slate-300 rounded-md focus:outline-none focus:border-primary"
          />
          {errors.dob && (
            <span className="text-red-500 block text-sm mt-1">
              Date of Birth is required
            </span>
          )}
        </div>

        {/* Repeat the pattern for other input groups */}

        <div className="w-full md:w-1/2 px-2 mb-4">
          <label
            className="block mt-4 text-gray-700 text-sm font-bold mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            {...register("gender", { required: true })}
            className="w-full px-4 py-2 border border-solid border-slate-300 rounded-md focus:outline-none focus:border-primary"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 block text-sm mt-1">
              Gender is required
            </span>
          )}
        </div>

        {/* Repeat the pattern for other input groups */}
      </div>

      <button
        type="submit"
        className="mt-6 bg-primary text-white px-4 py-2 w-full rounded-md hover:bg-primary focus:outline-none focus:shadow-outline-purple"
      >
        Sign Up
      </button>
      <div className="mt-4 text-sm">
        Already have an account?
        <Link href="/" className="text-primary hover:underline">
          Sign In here
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
