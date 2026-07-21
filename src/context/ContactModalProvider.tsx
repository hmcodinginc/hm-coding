import type { ReactNode } from "react";
import { ContactModalContext } from "./contactModalContext";

export function ContactModalProvider({
  children,
  openContact,
  openDemo,
}: {
  children: ReactNode;
  openContact: () => void;
  openDemo: () => void;
}) {
  return (
    <ContactModalContext.Provider value={{ openContact, openDemo }}>{children}</ContactModalContext.Provider>
  );
}
