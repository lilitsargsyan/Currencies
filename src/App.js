import React from "react";
import {Container} from "@material-ui/core";
import CurrencyTable from "./components/CurrencyTable/CurrencyTable";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "./theme";

function App() {

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <CurrencyTable />
            </Container>
        </ThemeProvider>
    );
}

export default App;
