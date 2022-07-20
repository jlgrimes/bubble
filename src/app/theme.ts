import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Karla',
    button: {
      // textTransform: 'none'
      letterSpacing: '1px'
    },
    h6: {
      fontWeight: 700
    }
  },
  
});

export default theme;