import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile")); //populate the user from local storage
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments); //display the whole comment section
  const [comment, setComment] = useState(""); //display when writing the comment
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments); //render new comments when submit immediately
    setComment(""); //clear the comment box
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((comment, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{comment.split(": ")[0]}</strong>&nbsp;
              {comment.split(": ")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {/* ?. make sure no errors throw out if user or result is undefined */}
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Leave a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
