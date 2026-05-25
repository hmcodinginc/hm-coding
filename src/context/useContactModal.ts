import { useContext } from "react";
import { ContactModalContext } from "./contactModalContext";

export function useContactModal() {
  const value = useContext(ContactModalContext);
  if (!value) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return value;
}
