import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { GlobalLoaderProvider } from "./context/GlobalLoaderContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { isSupabaseConfigured } from "./lib/supabase";
import MissingEnvScreen from "./components/MissingEnvScreen";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    {!isSupabaseConfigured ? (
      <MissingEnvScreen />
    ) : (
      <BrowserRouter>
        <ErrorBoundary>
          <GlobalLoaderProvider>
            <App />
          </GlobalLoaderProvider>
        </ErrorBoundary>
      </BrowserRouter>
    )}
  </React.StrictMode>,
);
