import React, { useEffect, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Chip,
  CircularProgress,
  CssBaseline,
  Grid,
  IconButton,
  PaletteMode,
  Stack,
} from "@mui/material";
import { Cookies } from "react-cookie";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import FileUpload from "./components/FileUpload";

function App() {
  const [predictedClass, setPredictedClass] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const cookies = new Cookies();
  const [themeMode, setThemeMode] = useState<PaletteMode>(
    cookies.get("theme") || "dark"
  );
  useEffect(() => {
    document.title = "Image classification";
  }, []);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#d0d0d0",
        light: "#FFFFFF",
        dark: "#ffbe4c",
        contrastText: "#000000",
      },
      secondary: {
        main: "#5a68e5",
        light: "#9196ff",
        dark: "#0d3eb2",
        contrastText: "#000000",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: themeMode === "light" ? "#030342" : "#D9FBFC",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme>
        <IconButton
          color="inherit"
          sx={{ position: "fixed", right: 25, top: 25, zIndex: 5 }}
          onClick={() => {
            let newTheme: PaletteMode = themeMode === "dark" ? "light" : "dark";
            setThemeMode(newTheme);
            cookies.set("theme", newTheme);
          }}
        >
          {cookies.get("theme") === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Grid item justifyContent="center">
            <Stack spacing={2} alignItems="center" justifyContent="center">
              <FileUpload
                setPredictedClass={setPredictedClass}
                isFetching={isFetching}
                setIsFetching={setIsFetching}
              />
              <Stack alignItems="center" direction="row" spacing={2}>
                {predictedClass && (
                  <Chip
                    label={predictedClass}
                    style={{ backgroundColor: "#C12F1D", height: "3vh" }}
                  ></Chip>
                )}
                {isFetching && <CircularProgress />}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
