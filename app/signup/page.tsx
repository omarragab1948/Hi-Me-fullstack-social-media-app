"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUp } from "../services/apiHandler";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SignUpInputs } from "../types/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const [imageData, setImageData] = useState("");
  const [show, setShow] = useState(false);

  const [displayImage, setDisplayImage] = useState("");
  const [dobValidationMessage, setDobValidationMessage] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleUploadImage = (e) => {
    const file = e.target?.files[0];
    setImageData(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDisplayImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const validateDateOfBirth = (date: string) => {
    const dob = new Date(date);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();
    if (isNaN(age)) {
      return true;
    } else if (age < 18) {
      return false;
    }

    return true;
  };

  const dob = watch("dob");
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    setValue("dob", dob);
    setDobValidationMessage(validateDateOfBirth(dob));
  }, [dob]);
  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    setSpinner(true);

    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      dob: data.dob,
      email: data.email,
      password: data.password,
      image: imageData,
    };
    const res = await signUp(user);
    if (res.status === 200) {
      console.log(res.data);
      router.push("/");
      setSpinner(false);
    } else {
      setError(res.message);
      setSpinner(false);
    }
  };
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);

  const password = watch("password");
  useEffect(() => {
    // Real-time password validation logic
    const validatePassword = (password) => {
      // Check if the password input has been focused
      if (!isPasswordInputFocused) {
        setPasswordValidationMessage("");
        return;
      }

      // Your password validation criteria
      const isLengthValid = password.length >= 8;
      const containsUppercase = /[A-Z]/.test(password);
      const containsLowercase = /[a-z]/.test(password);
      const containsDigit = /\d/.test(password);
      const containsSymbol = /[^A-Za-z0-9]/.test(password);

      if (!isLengthValid) {
        setPasswordValidationMessage(
          "Password must be at least 8 characters long"
        );
      } else if (
        !(
          containsUppercase &&
          containsLowercase &&
          containsDigit &&
          containsSymbol
        )
      ) {
        setPasswordValidationMessage(
          "Password must include uppercase, lowercase, digit, and symbol"
        );
      } else {
        setPasswordValidationMessage("");
      }
    };

    validatePassword(password);
  }, [password, isPasswordInputFocused]);
  return (
    <div className="max-w-lg mx-auto mt-8 p-6  rounded-md shadow-md px-4  shadow-slate-400">
      <div className="flex justify-center">
        <Link href={"/"} className="text-primary font-bold text-7xl mb-6 w-fit">
          HI-ME
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name <span className="text-red-500">(required)</span>
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: "First Name is required" })}
              className={`mt-1 p-2 block w-full border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-primary focus:border-primary`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name <span className="text-red-500">(required)</span>
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: "Last Name is required" })}
              className={`mt-1 p-2 block w-full border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-primary focus:border-primary`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">(required)</span>
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`mt-1 p-2 block w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-primary focus:border-primary`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">(required)</span>
            </label>
            <input
              type={show ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              className={`mt-1 p-2 block w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-primary focus:border-primary`}
              onChange={(e) => setValue("password", e.target.value)}
              onFocus={() => setIsPasswordInputFocused(true)}
              onBlur={() => setIsPasswordInputFocused(false)}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className={`absolute bottom-0 ${
                passwordValidationMessage ? "top-[-20px]" : "top-6"
              } right-0 pr-3 flex items-center focus:outline-none`}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordValidationMessage && (
              <span className="text-red-500 text-sm mt-1">
                {passwordValidationMessage}
              </span>
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth <span className="text-red-500">(required)</span>
            </label>
            <input
              type="date"
              id="dob"
              {...register("dob", {
                required: "Date of Birth is required",
                validate: validateDateOfBirth,
              })}
              className={`mt-1 p-2 block w-full border ${
                errors.dob ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-primary focus:border-primary`}
            />
            {!dobValidationMessage && (
              <span className="text-red-500 text-sm mt-1">
                You must be at least 18 years old.
              </span>
            )}
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 "
            >
              Gender <span className="text-red-500">(required)</span>
            </label>
            <select
              id="gender"
              {...register("gender", { required: "Gender is required" })}
              className={`mt-1 p-2 block w-full border ${
                errors.gender ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-primary focus:border-primary`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image <span className="text-red-500">(optional)</span>
            </label>
            <input
              type="file"
              id="image"
              onChange={handleUploadImage}
              className={`border rounded  py-2 w-full `}
            />
          </div>
          {displayImage && (
            <div className="w-1/2 ">
              <Image
                src={displayImage}
                alt="userImage"
                width={1000}
                height={100}
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-center">
            {error && (
              <span className="text-red-500 text-2xl mt-1">{error}</span>
            )}

            <div
              className={`border-4 my-2 border-solid  ${
                spinner ? "opacity-1" : "opacity-0"
              } border-gray-400 border-t-primary borderr-primary rounded-full w-8 h-8 animate-spin`}
            ></div>
          </div>
          <button
            disabled={!isValid}
            type="submit"
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm  ${
              isValid
                ? "bg-primary text-white hover:bg-primary"
                : "bg-gray-300 cursor-not-allowed text-gray-500"
            }
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
          >
            Sign Up
          </button>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link href="/" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
