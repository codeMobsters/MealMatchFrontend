import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#5e33ff",
        },
        secondary: {
            main: "#ff4633",
        },
    },
    breakpoints: {
        values: {
          xs: 0,
          tablet: 450,
          desktop: 700,
        },
    },
});

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
      sm: false;
      md: false;
      lg: false;
      xl: false;
      xs: true;
      tablet: true;
      desktop: true;
    }
  }