"use client";
import BasicMenu from "@/app/components/CoverMenu";
// import user from "@/public/user.jpg";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Popup from "@/app/components/Popup";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import SchoolIcon from "@mui/icons-material/School";
import { getUser } from "@/app/services/apiHandler";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/app/rtk/userSlice";

const page = () => {
  const list = [
    {
      text: "Edit",
      icon: <EditIcon />,
    },
    {
      text: "Delete",
      icon: <DeleteIcon />,
    },
  ];
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUser("658f9e8ee14bbc778198f52c");
        dispatch(setUser(res.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  const userPosts = user?.posts.map((post, index) => {
    const formattedDate = post.timestamp.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return (
      <div
        key={index}
        className="border px-4 py-2 mb-4 rounded-md  shadow-slate-400 shadow-md"
        style={{ direction: "ltr" }}
      >
        <div className="flex justify-between">
          <div className="flex items-center ">
            <img
              src={user?.profileImage}
              alt="Profile Image"
              width={1000}
              height={1000}
              className="rounded-full w-12 h-12"
            />
            <div className="flex flex-col items-start ml-4">
              <h4 className="text-lg font-bold">
                {user.firstName} {user.lastName}
              </h4>
              <span className="text-sm text-slate-500">{formattedDate}</span>
            </div>
          </div>
          <div>
            <BasicMenu title="" list={list} textColor="slate-400">
              <MoreHorizIcon className="text-slate-400 text-3xl" />
            </BasicMenu>
          </div>
        </div>
        <div className="border-b-slate-300 border border-solid p-4 break-all whitespace-pre-line">
          <p className="mt-4">{post.content}</p>
        </div>
        <div className="flex items-center justify-between border-b-slate-300 border border-solid">
          {post?.comments && (
            <div className="my-4">
              <Popup
                text="Comments"
                secondText="Emotions"
                content={post}
                commentsLength={post.comments.length}
                emotionsLength={post.emotions.length}
              />
              {/* <ul>
              {post.comments.map((comment, commentIndex) => (
                <li key={commentIndex} className="flex items-center mb-2">
                  <Image
                    src={user}
                    alt="commenter"
                    width={30}
                    height={30}
                    className="rounded-full mr-2"
                  />
                  <span>{comment.text}</span>
                </li>
              ))}
            </ul> */}
            </div>
          )}

          <div className="my-4 flex items-center">
            <span className="mr-2"></span>
            {post.emotions.map((emotion, emotionIndex) => (
              <span key={emotionIndex} className="text-md">
                {emotion.type === "like" ? (
                  <ThumbUpIcon className="text-primary" />
                ) : (
                  <FavoriteIcon className="text-red-600" />
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-around items-center p-2">
          <button className="hover:bg-primary hover:text-white duration-300 py-2 px-5 rounded-xl w-1/4 font-bold">
            Comment
          </button>
          <button className="hover:bg-primary hover:text-white duration-300 py-2 px-5 rounded-xl w-1/4 font-bold">
            Like
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="flex ">
      <div className="w-2/5 sticky top-0  h-[1200px]">
        <div className="flex items-center flex-col space-x-4 p-4 ">
          <span className="text-xl font-bold text-start w-full my-3">Bio</span>
          <div>
            <div className="flex items-center space-x-2">
              <DeveloperModeIcon />
              <p className="text-gray-600">{user?.about?.bio}</p>
            </div>
            <div className="flex items-center space-x-2 my-3">
              <LocationOnIcon />
              <p className="text-gray-600">{user?.about?.location}</p>
            </div>

            {user?.about?.education && (
              <div className="mt-2">
                <ul className="list-disc pl-5">
                  {user?.about?.education.map((edu, index) => (
                    <li
                      key={index}
                      className="my-2 flex items-center space-x-2"
                    >
                      <SchoolIcon />
                      <div>
                        <p className="font-semibold">{edu.institution}</p>
                        <p>{`${edu.degree}, Graduated ${edu.graduationYear}`}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-wrap justify-start items-center p-4">
          <div className="flex justify-start w-full p-3">
            <h5 className="text-xl font-bold">Images</h5>
          </div>
          <div className="flex flex-wrap justify-start items-center">
            {user?.uploadedImages?.map((image, index) => (
              <Image
                key={index}
                src={user}
                alt={`Image ${index + 1}`}
                className="w-1/3 h-28 rounded-md m-2"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-wrap justify-start items-center p-4">
          <div className="flex justify-start w-full p-3">
            <h5 className="text-xl font-bold">Friends</h5>
          </div>
          <div className="flex flex-wrap justify-start items-center">
            {user?.friends?.map((friend, index) => (
              <div className="flex flex-col justify-center items-center w-1/3 mx-2">
                <Image
                  key={index}
                  src={user}
                  alt={`Image ${index + 1}`}
                  className="w-full h-28 rounded-md m-2"
                />
                <span>{friend.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-3/5 ">
        <div className="flex pb-6 items-center border-b border-slate-400 border-solid my-4">
          <button className="border border-slate-400 hover:bg-primary font-bold hover:text-white duration-300 rounded-full w-[85%] p-4 text-left ml-4">
            Add post
          </button>
          <div>
            <Image
              src={user?.profileImage}
              alt="Profile Image"
              width={100}
              height={100}
              className="rounded-full w-16 h-16"
            />
          </div>
        </div>
        {userPosts}
      </div>
    </div>
  );
};

export default page;
