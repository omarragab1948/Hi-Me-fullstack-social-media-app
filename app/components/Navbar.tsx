"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SideBar from "./SideBar";
import { FaFacebookMessenger } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import Image from "next/image";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  React.useState<null | HTMLElement>(null);
  const user = useSelector((state) => state.user.user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#7360DF" }}>
        <Toolbar className="flex justify-between">
          <Box className="flex ">
            <SideBar />
          </Box>
          <Box
            className="hidden bg-primary sm:flex justify-between items-center"
            sx={{ width: "20%", padding: "16px", backgroundColor: "#7360DF" }}
          >
            <Box>
              <Link href={"/home/settings"}>
                <SettingsIcon sx={{ fontSize: "30px" }} />
              </Link>
            </Box>
            <Box>
              <Link href={"/home/notifications"}>
                <NotificationsIcon sx={{ fontSize: "30px" }} />
              </Link>
            </Box>
            <Box>
              <Link href={"/home/messenger"}>
                <FaFacebookMessenger sx={{ fontSize: "30px" }} />
              </Link>
            </Box>
          </Box>
          <Search
            sx={{
              width: {
                xs: "60%",
                sm: "40%",
              },
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box className="hidden sm:block">
            <Link href={`/home/profile/${user?._id}`}>
              <Image
                src={user.profileImage}
                alt="Profile Image"
                width={1000}
                height={1000}
                className="w-14 h-14 rounded-full"
              />
            </Link>
          </Box>
          <Link href={"/home"} className="pr-0 text-2xl">
            HI-ME
          </Link>
        </Toolbar>
        <Box className="sm:hidden  p-4 bg-primary flex justify-between items-center">
          <Box>
            <Link href={"/home/settings"}>
              <SettingsIcon className="text-3xl" />
            </Link>
          </Box>
          <Box>
            <Link href={"/home/notifications"}>
              <NotificationsIcon className="text-3xl text-white" />
            </Link>
          </Box>
          <Box>
            <Link href={"/home/messenger"}>
              <FaFacebookMessenger className="text-2xl text-white" />
            </Link>
          </Box>
          <Box>
            <Link href={"/home"}>
              <GoHomeFill className="text-3xl text-white" />
            </Link>
          </Box>
          <Box>
            <Link href={`/home/profile/${user?._id}`}>
              <Image
                src={user.profileImage}
                alt="Profile Image"
                width={1000}
                height={1000}
                className="w-14 h-14 rounded-full"
              />
            </Link>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}
