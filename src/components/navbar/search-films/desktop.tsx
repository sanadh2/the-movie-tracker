"use client";

import SearchDropdown from "./search-dropdown";

export default function SearchFilmsInDesktop() {
  return (
    <div className="relative max-w-96 hidden md:block h-full">
      <SearchDropdown />
    </div>
  );
}
