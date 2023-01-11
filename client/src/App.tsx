import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import Layout from "./components/Layout";

function App() {
  // define theme using material ui dark theme
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        light: "#F0EBD8",
        main: "#3E5C76",
        dark: "#bdd9e9",
      },
      secondary: {
        light: "#748CAB",
        main: "#1D2D44",
        dark: "#0D1321",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
