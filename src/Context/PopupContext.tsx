import { createContext, useState } from "react";

interface contextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const PopupContext = createContext<contextType | Record<string, never>>(
  {}
);

export default function PopupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const contextValues = {
    isOpen,
    setIsOpen,
  };
  return (
    <PopupContext.Provider value={contextValues}>
      {children}
    </PopupContext.Provider>
  );
}
