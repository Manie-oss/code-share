import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs";
import { AppContextProvider } from "./context/AppStateProvider.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Toaster
          position="top-center"
          toastOptions={{ style: { fontSize: "0.8rem" } }}
          reverseOrder={false}
        />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:id" element={<App />} />
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
