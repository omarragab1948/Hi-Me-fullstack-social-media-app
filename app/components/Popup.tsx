"use client";
// Popup.js
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";

export default function Popup({
  text,
  content,
  commentsLength,
  emotionsLength,
  secondText,
}) {
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
      <Button onClick={handleClickOpen} className="text-black ">
        <span>{text}</span>
        <span className="ml-2 ">{commentsLength}</span>
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <p className="whitespace-pre-wrap p-4">{content.content}</p>
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            {text} {commentsLength}
          </span>
          <span>
            {secondText} {emotionsLength}
          </span>
        </DialogTitle>
        <DialogContent>
          <div className="overflow-y-auto max-h-96">
            <div className="flex justify-between">
              {content?.comments && (
                <div className="mt-4">
                  <ul>
                    {content.comments.map((comment, commentIndex) => (
                      <li key={commentIndex} className="flex items-center mb-2">
                        <Image
                          src={comment.userImage}
                          alt="commenter"
                          width={24}
                          height={24}
                          className="rounded-full mr-2"
                        />
                        <span>{comment.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {content?.emotions && (
                <div className="mt-4 flex items-center">
                  {content.emotions.map((emotion, emotionIndex) => (
                    <span key={emotionIndex} className="mr-2">
                      {emotion.type === "like" ? (
                        <ThumbUpIcon className="text-primary" />
                      ) : (
                        <FavoriteIcon className="text-red-600" />
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
