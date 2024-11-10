"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const searchContext = createContext<
  undefined | { search: string; setSearch: Dispatch<SetStateAction<string>> }
>(undefined);

export default function SearchContextProvider({ children }: PropsWithChildren) {
  const [search, setSearch] = useState<string>("");
  return (
    <searchContext.Provider value={{ search, setSearch }}>
      {children}
    </searchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(searchContext);
  if (!context) {
    throw new Error("use useSearch under SearchContextProvider");
  }
  return context;
};
