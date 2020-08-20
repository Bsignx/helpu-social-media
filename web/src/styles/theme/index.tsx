import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Ubuntu", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    primary: {
      main: '#204051',
    },
    secondary: {
      main: '#84A9AC',
    },
  },
});

export default theme;
