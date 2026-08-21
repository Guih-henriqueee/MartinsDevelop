import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { MotionCapabilitiesProvider } from "./motion/useReducedMotion";
import { ThemeProvider } from "./motion/useTheme";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MotionCapabilitiesProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MotionCapabilitiesProvider>
  </React.StrictMode>
);
