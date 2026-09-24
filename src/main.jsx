import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { LuckyDrawProvider } from "./context/LuckyDrawContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LuckyDrawProvider>
      <App />
    </LuckyDrawProvider>
  </StrictMode>
);