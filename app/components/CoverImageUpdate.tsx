import React, { useState } from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
import { updateCoverImage } from "../services/apiHandler";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../rtk/userSlice";

const CoverImageUpdatePopup = () => {
  const [newCoverImage, setNewCoverImage] = useState(null);
  const [newCoverImageSrc, setNewCoverImageSrc] = useState(null);
  const [coverSpinner, setCoverSpinner] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewCoverImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCoverImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleuploadProfileImage = async () => {
    setCoverSpinner(true);

    const formData = new FormData();
    formData.append("coverImage", newCoverImage);

    try {
      const res = await updateCoverImage("658f9e8ee14bbc778198f52c", formData);
      setCoverSpinner(false);

      dispatch(setUser(res.data));
      console.log(res.data);
      setNewCoverImageSrc(null);
    } catch (e) {
      console.error(e);
      setCoverSpinner(false);
    }
  };

  return (
    <div className="flex flex-col justify-around items-center my-5 w-full">
      <div className="flex items-center justify-between w-full my-4">
        <Button
          onClick={() => handleuploadProfileImage()}
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
          onChange={(event) => handleFileChange(event)}
        />
        <span className="text-xl text-black font-bold">صورة الغلاف</span>
      </div>
      <div className="flex items-center justify-around w-full">
        <div className="flex flex-col justify-center w-2/5 items-center">
          <span className="text-lg font-bold my-3 text-black">Old</span>
          <Image
            alt="Profile Image"
            src={user?.coverImage}
            width={1000}
            height={1000}
            className=" w-48 h-48"
          />
        </div>
        <div
          className={`border-4 my-2 border-solid  ${
            coverSpinner ? "opacity-1" : "opacity-0"
          } border-gray-400 border-t-primary borderr-primary rounded-full w-8 h-8 animate-spin`}
        ></div>
        <div className="flex flex-col justify-center w-2/5 items-center">
          <span className="text-lg font-bold my-3 text-black">New</span>
          {newCoverImageSrc ? (
            <img
              alt="new cover Image"
              src={newCoverImageSrc}
              className=" w-48 h-48"
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

export default CoverImageUpdatePopup;
