import type { ReactNode } from "react";
import { ContactModalContext } from "./contactModalContext";

export function ContactModalProvider({
  children,
  openContact,
}: {
  children: ReactNode;
  openContact: () => void;
}) {
  return (
    <ContactModalContext.Provider value={{ openContact }}>{children}</ContactModalContext.Provider>
  );
}
