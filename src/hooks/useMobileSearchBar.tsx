"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface Props {
  open: boolean;
  close: () => void;
}

const MobileSearchBarContext = createContext<Props | undefined>(undefined);

export const useMobileSearchBar = () => {
  const context = useContext(MobileSearchBarContext);
  if (!context) {
    throw new Error(
      "only use MovieSearchBarContext within MovieContextSearchBarProvider"
    );
  }
  return context;
};

export const MobileSearchBarContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <MobileSearchBarContext.Provider
      value={{
        open,
        close: () => setOpen((prev) => !prev),
      }}
    >
      <div className="">{children}</div>
    </MobileSearchBarContext.Provider>
  );
};
