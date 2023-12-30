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
export default function UpdateProfilePopup() {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          fontSize: "20px",
          border: "none",
          color: "black",
          fontWeight: "bold",
        }}
      >
        <span> تعديل الملف الشخصي</span>

        <EditIcon />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent sx={{ width: "600px" }}>
          <DialogContentText>
            <div className="flex justify-center items-center flex-col ">
              <ProfileImageUpdatePopup />
              <CoverImageUpdatePopup />

              {/* Section 3: Additional Information or Buttons */}
              <div className="flex flex-col items-center">
                {/* You can add more sections or information here */}
                {/* For example, user details, bio, etc. */}

                {/* You can add additional buttons or information as needed */}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
