import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { YoutubeVideos } from "./screens/YoutubeVideos";
import App from "./App";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
