"use client";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { deleteProfileImage } from "../services/apiHandler";
import { useDispatch } from "react-redux";
import { setUser } from "../rtk/userSlice";
import CloseIcon from "@mui/icons-material/Close";
export default function DeleteProfileImgPopup({ openPopup, setOpenPopup }) {
  const handleClose = () => {
    setOpenPopup(false);
  };

  const [spinner, setSpinner] = React.useState(false);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    setSpinner(true);
    try {
      const res = await deleteProfileImage("658f9e8ee14bbc778198f52c");
      dispatch(setUser(res.data));
      setSpinner(false);
      setOpenPopup(false);
    } catch (err) {
      console.log(err);
      setSpinner(true);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={openPopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              // width: "200px",
              position: "relative",
              padding: "10px",
            }}
          >
            <button
              onClick={handleClose}
              className="absolute top-[-5px] left-[-5px]"
            >
              <CloseIcon />
            </button>
            <div
              className={`border-4 my-2 border-solid mx-auto ${
                spinner ? "opacity-1" : "opacity-0"
              } border-gray-400 border-t-primary borderr-primary rounded-full w-8 h-8 animate-spin`}
            ></div>
            <p className="mx-auto text-xl font-bold my-3 text-black">
              هل تريد بالفعل حذف صورة الملف الشخصي
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white w-40 rounded-md p-3 mr-4 transition duration-300 ease-in-out"
              >
                تأكيد
              </button>
              <button
                onClick={handleClose}
                className="bg-gray-300 hover:bg-gray-400 text-black w-40 rounded-md p-3 transition duration-300 ease-in-out"
              >
                الغاء
              </button>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
