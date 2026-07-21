import { createContext } from "react";

export type ContactModalContextValue = {
  openContact: () => void;
  openDemo: () => void;
};

export const ContactModalContext = createContext<ContactModalContextValue | null>(null);
