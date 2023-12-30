"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MenuTypes } from "../types/types";
import UpdateProfileImagePopup from "./UpdateProImagePopup";
import DeleteProfileImgPopup from "./DeleteProfileImgpopup";

export default function ProfileMenu({
  title,
  list,
  textColor,
  children,
}: MenuTypes) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [Popup, setPopup] = React.useState(false);
  const [deletePopup, setDeletePopup] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenPopup = () => {
    setPopup(true);
    console.log(Popup);
  };
  const handleDeletePopup = () => {
    setDeletePopup(true);
  };
  return (
    <div>
      <button onClick={handleClick}>
        <UpdateProfileImagePopup
          Popup={Popup}
          setPopup={setPopup}
          title={title}
        />
        <DeleteProfileImgPopup
          openPopup={deletePopup}
          setOpenPopup={setDeletePopup}
        />
        {children}
      </button>
      <Menu
        sx={{ display: "flex", direction: "rtl" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {list.map((item, index) => (
          <MenuItem key={index} className="text-xl w-80">
            <div className="ml-3">{item.icon}</div>
            {item.text === "ازالة" ? (
              <button onClick={handleDeletePopup}>{item.text}</button>
            ) : (
              <button onClick={handleOpenPopup}>{item.text}</button>
            )}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
