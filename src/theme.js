import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: blue,
        secondary: green,
    },
});

const Theme = (props) => {
    const { children } = props;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
export const whitTheme = (Component) => {
    return(props) => {
        return (
            <Theme>
                <Component {...props} />
            </Theme>
        )
    }
}

// export default theme;