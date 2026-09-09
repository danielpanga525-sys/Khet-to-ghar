import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker so the app keeps working offline after the
// first visit. Feature-detected and wrapped in a catch — harmless no-op
// on browsers/contexts (e.g. non-HTTPS) that don't support it.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Offline support simply won't be available in this environment —
      // the app still works normally while online.
    });
  });
}
