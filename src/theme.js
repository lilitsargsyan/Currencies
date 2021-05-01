import { createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';
// import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        }  ,
        secondary: {
            main: '#f50057',
        },
        error: {
            main: '#f44336',
        },
        success: {
            main: '#4caf50',
        },
        warning: {
            main: '#ff9800',
        },
    },
});

export default theme;