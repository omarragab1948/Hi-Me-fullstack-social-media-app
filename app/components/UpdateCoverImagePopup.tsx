"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import ProfileImageUpdatePopup from "./ProfileImageUpdate";
import CoverImageUpdatePopup from "./CoverImageUpdate";
export default function UpdateCoverImagePopup({ title, Popup, setPopup }) {
  const [open, setOpen] = React.useState(false);
  console.log(Popup);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPopup(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={Popup}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent sx={{ width: "600px" }}>
          <DialogContentText>
            <div className="flex justify-center items-center flex-col ">
              <CoverImageUpdatePopup title={title} />
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
