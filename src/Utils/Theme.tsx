import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#000000",
        },
        secondary: {
            main: "#FFFFFF",
        },
        error: {
            main: "#FF0000"
        }
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