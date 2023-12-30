"use client";
import Image from "next/image";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import ImageIcon from "@mui/icons-material/Image";
import UpdateProfilePopup from "./UpdateProfilePopup";
import ProfileMenu from "./ProfileMenu";
import CoverMenu from "./CoverMenu";

const ProfLayout = () => {
  const user = useSelector((state) => state.user.user);
  const list = [
    {
      text: "تحميل صورة",
      icon: <UploadIcon />,
    },
    {
      text: "ازالة",
      icon: <DeleteIcon />,
    },
  ];
  console.log(user);
  return (
    <div className=" w-full h-96 bg-gradient-to-b to-white from-slate-400 ">
      <div className="w-3/4 h-full mx-auto mt-10 rounded-b-2xl relative">
        <img
          src={user?.coverImage}
          alt="user"
          className="h-full w-full rounded-b-2xl"
        />
        <div className="bg-[rgba(255, 255, 255, 0.5)] flex items-center backdrop-filter backdrop-blur-md text-white text-xl absolute left-10 top-[300px] py-3 px-4 rounded-lg">
          <CoverMenu title="تعديل صورة الغلاف" list={list} textColor="white">
            <CameraAltIcon className="ml-3" />
          </CoverMenu>
        </div>
        <div className="flex absolute right-10 top-[300px] bg-white w-[200px] h-[200px] rounded-full p-1">
          <div className="relative w-full h-full">
            <img
              src={user?.profileImage}
              alt="user"
              className="w-full h-full rounded-full"
            />
            <div className="absolute bottom-4 bg-white rounded-full left-0 p-2">
              <ProfileMenu
                title="تعديل صورة الملف الشخصي"
                list={list}
                textColor="white"
              >
                <CameraAltIcon className=" text-xl  text-black" />
              </ProfileMenu>
            </div>
          </div>
        </div>

        <div className="mt-4 w-3/4 flex items-center justify-between">
          <UpdateProfilePopup />

          <div className=" mt-4 flex flex-col justify-end items-end">
            <span className="text-3xl font-bold">
              {user?.firstName} {user?.lastName}
            </span>
            <Link
              href={"/home/profile/friends"}
              className="text-slate-500 mt-2"
            >
              {user?.friends.length
                ? `friends ${user?.friends}`
                : "You haven't friends yet"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfLayout;
