import { createContext } from "react";

export type ContactModalContextValue = {
  openContact: () => void;
};

export const ContactModalContext = createContext<ContactModalContextValue | null>(null);
