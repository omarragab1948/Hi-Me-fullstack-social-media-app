import React, { useState } from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
import { updateProfileImage } from "../services/apiHandler";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../rtk/userSlice";

const ProfileImageUpdate = () => {
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newProfileImageSrc, setNewProfileImageSrc] = useState(null);
  const [profileSpinner, setProfileSpinner] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProfileImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadProfileImage = async () => {
    setProfileSpinner(true);

    const formData = new FormData();
    formData.append("profileImage", newProfileImage);

    try {
      const res = await updateProfileImage(
        "658f9e8ee14bbc778198f52c",
        formData
      );
      setProfileSpinner(false);

      dispatch(setUser(res.data));
      console.log(res.data);
      setNewProfileImageSrc(null);
    } catch (e) {
      console.error(e);
      setProfileSpinner(false);
    }
  };

  return (
    <div className="flex flex-col justify-around items-center  w-full">
      <div className="flex items-center justify-between w-full my-4">
        <Button
          onClick={() => handleUploadProfileImage()}
          variant="outlined"
          color="primary"
          sx={{
            width: "fit-width",
            border: "none",
            outline: "none",
            fontWeight: "bold",
            ":hover": {
              border: "none",
            },
          }}
        >
          Update
        </Button>
        <input
          type="file"
          name="newprofileimage"
          className="w-[250px]"
          onChange={(event) => handleFileChange(event)}
        />
        <span className="text-xl text-black font-bold">صورة الملف الشخصي</span>
      </div>
      <div className="flex items-center justify-around w-full">
        <div className="flex flex-col justify-center items-center">
          <span className="text-lg font-bold my-3 text-black">Old</span>
          <Image
            alt="old profile image"
            src={user?.profileImage}
            width={1000}
            height={1000}
            className="rounded-full w-40 h-40"
          />
        </div>
        <div
          className={`border-4 my-2 border-solid  ${
            profileSpinner ? "opacity-1" : "opacity-0"
          } border-gray-400 border-t-primary borderr-primary rounded-full w-8 h-8 animate-spin`}
        ></div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-lg font-bold my-3 text-black">New</span>
          {newProfileImageSrc ? (
            <img
              alt="new Profile Image"
              src={newProfileImageSrc}
              className="rounded-full w-40 h-40"
            />
          ) : (
            <span className="text-lg font-bold my-3 text-black">
              No image selected
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpdate;
