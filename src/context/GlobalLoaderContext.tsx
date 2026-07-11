import React, { createContext, useContext, useState, useCallback } from "react";
import LoaderOverlay from "../components/LoaderOverlay";

interface GlobalLoaderContextType {
  showLoader: () => void;
  hideLoader: () => void;
  isLoading: boolean;
}

const GlobalLoaderContext = createContext<GlobalLoaderContextType | undefined>(undefined);

export function GlobalLoaderProvider({ children }: { children: React.ReactNode }) {
  const [loadingCount, setLoadingCount] = useState(1);

  const showLoader = useCallback(() => {
    setLoadingCount((prev) => prev + 1);
  }, []);

  const hideLoader = useCallback(() => {
    setLoadingCount((prev) => Math.max(0, prev - 1));
  }, []);

  const isLoading = loadingCount > 0;

  return (
    <GlobalLoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
      {children}
      <LoaderOverlay visible={isLoading} />
    </GlobalLoaderContext.Provider>
  );
}

export function useGlobalLoader() {
  const context = useContext(GlobalLoaderContext);
  if (context === undefined) {
    throw new Error("useGlobalLoader must be used within a GlobalLoaderProvider");
  }
  return context;
}
