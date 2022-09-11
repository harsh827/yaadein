import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";
import useStyles from "./styles";
import { purple, pink, orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#22556B",
    "&:hover": {
        backgroundColor: "#103B4D",
    },
}));

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const classes = useStyles();
    const commentsRef = useRef();

    const handleComment = async () => {
        const newComments = await dispatch(
            commentPost(`${user?.result?.name}: ${comment}`, post._id)
        );

        setComment("");
        setComments(newComments);

        commentsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6" style={{color: "#22556B"}}>
                        Comments
                    </Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1" style={{color: "black"}}>
                            <strong>{c.split(": ")[0]}</strong>
                            {c.split(":")[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                <div style={{ width: "70%" }}>
                    <Typography gutterBottom variant="h6" style={{color: "#22556B"}}>
                        Write a comment
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
                    <br />
                    <ColorButton
                        style={{ marginTop: "10px" }}
                        fullWidth
                        disabled={!comment.length}
                        color="primary"
                        variant="contained"
                        onClick={handleComment}
                    >
                        Comment
                    </ColorButton>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
