import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#000000",
        },
        secondary: {
            main: "#FFFFFF",
        },
    },
    breakpoints: {
        values: {
          xs: 0,
          tablet: 420,
          desktop: 820,
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