import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBarSearch: {
        borderRadius: 10,
        marginBottom: "1rem",
        display: "flex",
        padding: "16px",
    },
    pagination: {
        borderRadius: 10,
        marginTop: "1rem",
        padding: "16px",
    },
    gridContainer: {
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column-reverse",
        },
        borderRadius: 10,
    },
}));
