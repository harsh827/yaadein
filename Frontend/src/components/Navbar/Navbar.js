import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import memoriesLogo from "../../images/logo.png";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import mainlogo from "../../images/logo.png";
import * as actionType from "../../constants/actionTypes";
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

const Navbar = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push("/auth");

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <AppBar
            className={classes.appBar}
            position="static"
            color="inherit"
            style={{
                backgroundColor: "white",
                boxShadow: "0 0 0.5px 0.5px #22556B",
            }}
        >
            <div>
                <Typography
                    component={Link}
                    to="/"
                    className={classes.heading}
                    variant="h1"
                    style={{ color: "#22556B" }}
                    align="center"
                >
                    Travel Freak
                </Typography>
            </div>

            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user?.result.name}
                            src={user?.result.imageUrl}
                        >
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography variant="h6">
                            <Link
                                style={{
                                    color: "#22556B",
                                    textDecoration: "none",
                                }}
                                to={`/creators/${user?.result.name}`}
                            >
                                {user?.result.name}
                            </Link>
                        </Typography>

                        <Button
                            variant="contained"
                            className={classes.logout}
                            color="secondary"
                            onClick={logout}
                        >
                            Logout
                            <ExitToAppIcon></ExitToAppIcon>
                        </Button>
                    </div>
                ) : (
                    <ColorButton
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </ColorButton>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
