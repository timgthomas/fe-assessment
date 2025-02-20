import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.querySelector("main")!).render(
  <StrictMode>
    <h1>MQTT Messages</h1>
    <App />
  </StrictMode>,
);
