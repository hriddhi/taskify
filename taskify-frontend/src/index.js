// index.js
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

const theme = createTheme({
  palette: {
    mode: "light", // try "dark" for dark mode
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#e91e63", // Pink
    },
  },
})

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* resets default CSS */}
    <BrowserRouter>
      <AuthProvider>
        <App />
      <AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
)
