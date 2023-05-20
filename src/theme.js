import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//control k + control g


// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "light"
    ? { 
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#fcfcfc", //  manually changed #f2f0f0 background
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        pale: {
          100: "#f7e2e8",
          200: "#f0c4d1",
          300: "#e8a7bb",
          400: "#e189a4",
          500: "#d96c8d", // greenAccent 400
          600: "#ae5671",
          700: "#824155",
          800: "#572b38",
          900: "#2b161c"
        },
        ruddy: {
          100: "#fae7ea",
          200: "#f6cfd4",
          300: "#f1b7bf",
          400: "#ed9fa9",
          500: "#e88794",
          600: "#ba6c76",
          700: "#8b5159",
          800: "#5d363b",
          900: "#2e1b1e"
        },
        oldRose: {
          100: "#f4e7e7",
          200: "#e9cece",
          300: "#ddb6b6",
          400: "#d29d9d",
          500: "#c78585",
          600: "#9f6a6a",
          700: "#775050",
          800: "#503535",
          900: "#281b1b"
        },
        crayola: {
          100: "#fbf3ea",
          200: "#f7e7d5",
          300: "#f3dac0",
          400: "#efceab",
          500: "#ebc296",
          600: "#bc9b78",
          700: "#8d745a",
          800: "#5e4e3c",
          900: "#2f271e"
        },
        medium: {
          100: "#fcf9ee",
          200: "#faf3de",
          300: "#f7eecd",
          400: "#f5e8bd",
          500: "#f2e2ac",
          600: "#c2b58a",
          700: "#918867",
          800: "#615a45",
          900: "#302d22"
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#d96c8d", // Manually changed #3da58a
          500: "#d96c8d", // Manually changed #4cceac"
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
        danger: {
          100: "#ffd1d1",
          200: "#ffa3a3",
          300: "#ff7575",
          400: "#ff4747",
          500: "#ff1919",
          600: "#cc1414",
          700: "#990f0f",
          800: "#660a0a",
          900: "#330505"
},
      }
    : { 
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414", 
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#4C4A45", //Quartz Manually changed #1F2A40
          500: "#1F262A", //Dark Gunmetal Manually changed #141b2d
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#141414", // Grey Manually changed #dbf5ee
          200: "#141414", // Grey Manually changed #b7ebde
          300: "#141414", // Grey Manually changed #94e2cd
          400: "#D1B496", // Tan Manually changed #70d8bd
          500: "#A5917B", // Dark Silver Manually changed #4cceac
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#FED8B1", // Light Orange Manually changed #3e4396
          800: "#2a2d64",
          900: "#151632",
        },
        danger: {
          100: "#ffe0e0",
          200: "#ffc2c2",
          300: "#ffa3a3",
          400: "#ff8585",
          500: "#ff6666",
          600: "#cc5252",
          700: "#993d3d",
          800: "#662929",
          900: "#331414"
},
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? { 
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#f2f0f0", // Manually changed #fcfcfc primary[400]
            },
          }
        : {
             // palette values for dark mode
             primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
