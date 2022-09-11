import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { withStyles } from "@material-ui/core/styles";
import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";
import { purple, pink, orange, blueGrey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const WhiteTextTypography = withStyles({
    root: {
        color: "#22556B",
    },
})(Typography);

const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "#22556B",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#9A9A9A",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#22556B",
            },
            "&:hover fieldset": {
                borderColor: "#22556B",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#9A9A9A",
            },
        },
    },
})(TextField);

const CssChipInput = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "#22556B",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#9A9A9A",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#22556B",
            },
            "&:hover fieldset": {
                borderColor: "#22556B",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#9A9A9A",
            },
        },
    },
})(ChipInput);

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#22556B",
    "&:hover": {
        backgroundColor: "#103B4D",
    },
}));

const ClearButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[900],
    "&:hover": {
        backgroundColor: blueGrey[500],
    },
}));

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: [],
        selectedFile: "",
    });
    const post = useSelector((state) =>
        currentId
            ? state.posts.posts.find((message) => message._id === currentId)
            : null
    );
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));
    const history = useHistory();

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: "", message: "", tags: [], selectedFile: "" });
    };

    useEffect(() => {
        if (!post?.title) clear();
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(
                createPost({ ...postData, name: user?.result?.name }, history)
            );
            clear();
        } else {
            dispatch(
                updatePost(currentId, { ...postData, name: user?.result?.name })
            );
            clear();
        }
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own Travel post and like
                    other's post.
                </Typography>
            </Paper>
        );
    }

    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
    };

    const handleDeleteChip = (chipToDelete) => {
        setPostData({
            ...postData,
            tags: postData.tags.filter((tag) => tag !== chipToDelete),
        });
    };

    return (
        <form
            autoComplete="off"
            noValidate
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
        >
            <Paper
                className={classes.paper}
                elevation={6}
                style={{
                    backgroundColor: "white",
                    boxShadow: "0 0 3px 3px white",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        gap: "130px",
                    }}
                >
                    <div>
                        <WhiteTextTypography
                            variant="h6"
                            style={{ colour: "#22556B" }}
                        >
                            {currentId
                                ? `Editing "${post?.title}"`
                                : "Creating a Post"}
                        </WhiteTextTypography>
                        <CssTextField
                            name="title"
                            variant="outlined"
                            label="Headline"
                            sx={{ input: { color: "red" } }}
                            InputLabelProps={{
                                style: { color: "#22556B" },
                                root: {
                                    color: "purple",
                                },
                            }}
                            fullWidth
                            value={postData.title}
                            onChange={(e) =>
                                setPostData({
                                    ...postData,
                                    title: e.target.value,
                                })
                            }
                        />
                        <CssTextField
                            name="message"
                            variant="outlined"
                            label="Whats on your mind?"
                            fullWidth
                            multiline
                            rows={4}
                            InputLabelProps={{
                                style: { color: "#22556B" },
                            }}
                            value={postData.message}
                            onChange={(e) =>
                                setPostData({
                                    ...postData,
                                    message: e.target.value,
                                })
                            }
                        />
                        <div style={{ padding: "5px 0", width: "98%" }}>
                            <CssChipInput
                                name="tags"
                                variant="outlined"
                                label="HashTags"
                                style={{ borderBlockColor: "purple" }}
                                fullWidth
                                InputLabelProps={{
                                    style: {
                                        color: "#22556B",
                                        borderColor: "white",
                                    },
                                }}
                                value={postData.tags}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                            />
                        </div>
                        <div className={classes.fileInput}>
                            <FileBase
                                type="file"
                                InputLabelProps={{
                                    style: { color: "#22556B" },
                                }}
                                multiple={false}
                                onDone={({ base64 }) =>
                                    setPostData({
                                        ...postData,
                                        selectedFile: base64,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: "10px",
                            paddingTop: "300px",
                        }}
                    >
                        <div>
                            <ClearButton
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={clear}
                                fullWidth
                            >
                                Clear
                            </ClearButton>
                        </div>

                        <div>
                            <ColorButton
                                className={classes.buttonSubmit}
                                variant="contained"
                                color="primary"
                                size="small"
                                type="submit"
                                fullWidth
                            >
                                Submit
                            </ColorButton>
                        </div>
                    </div>
                </div>
            </Paper>
        </form>
    );
};

export default Form;
