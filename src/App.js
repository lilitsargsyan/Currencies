import React from "react";
import {Container, makeStyles} from "@material-ui/core";
import CurrencyTable from "./components/CurrencyTable/CurrencyTable";
import {whitTheme} from "./theme";
import './app.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height:"100%",
        paddingTop: '20px',
        backgroundColor: theme.palette.background.paper
    }
}));


function App() {
    const classes = useStyles();

    return (
        <Container maxWidth={false} className={classes.root} color="primary">
            <CurrencyTable />
        </Container>
    );
}

export default whitTheme(App);
