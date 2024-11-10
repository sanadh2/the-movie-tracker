"use client";
import SearchFilmsInDesktop from "./desktop";
import SearchFilmsInMobile from "./mobile";
import SearchContextProvider from "./useSearch";
import { useWindowSize } from "@uidotdev/usehooks";
export default function SearchFilms() {
  const windowSize = useWindowSize().width;

  return (
    <SearchContextProvider>
      {windowSize ? (
        windowSize > 768 ? (
          <SearchFilmsInDesktop />
        ) : (
          <SearchFilmsInMobile />
        )
      ) : (
        <>
          <SearchFilmsInMobile />
          <SearchFilmsInDesktop />
        </>
      )}
    </SearchContextProvider>
  );
}
