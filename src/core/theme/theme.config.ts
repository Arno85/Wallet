import { createTheme } from '@mui/material';

const theme = createTheme({
  spacing: [0, 4, 8, 16, 32, 64],
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    h1: {
      fontSize: 96,
      fontWeight: 300,
    },
    h2: {
      fontSize: 60,
      fontWeight: 300,
    },
    h3: {
      fontSize: 48,
      fontWeight: 400,
    },
    h4: {
      fontSize: 34,
      fontWeight: 400,
    },
    h5: {
      fontSize: 24,
      fontWeight: 500,
    },
    h6: {
      fontSize: 20,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 500,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
    },
    button: {
      fontSize: 14,
      fontWeight: 500,
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
    },
    overline: {
      fontSize: 12,
      fontWeight: 400,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#005BD4',
      light: '#70BFFF',
      dark: '#003765',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#A0ACBD',
      light: '#E3E6EB',
      dark: '#606771',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F44336',
      light: '#F88078',
      dark: '#E31B0C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ED6C02',
      light: '#C77700',
      dark: '#FFB547',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#2196F3',
      light: '#0B79D0',
      dark: '#64B6F7',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#7BC67E',
      dark: '#3B873E',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#14142A',
      secondary: '#40454C',
      disabled: '#606771',
    },
    grey: {
      50: '#FBFCFC',
      100: '#F6F7F8',
      200: '#E3E6EB',
      300: '#D0D6DE',
      400: '#BDC5D1',
      500: '#A0ACBD',
      600: '#808A97',
      700: '#606771',
      800: '#40454C',
      900: '#202226',
    },
  },
});

// Global styles
theme.components = {
  MuiCssBaseline: {
    styleOverrides: {
      'html, body, #root': {
        height: '100%',
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
      },
      '& a': {
        textDecoration: 'none',
        color: theme.palette.text.primary,
      },
      '& p, h1, h2, h3, h4, h5, h6': {
        margin: 0,
        padding: 0,
      },
    },
  },
};

export default theme;
