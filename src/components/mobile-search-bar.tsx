"use client";
import { useMobileSearchBar } from "@/hooks/useMobileSearchBar";
import { Search } from "lucide-react";

export default function MobileSearchBar() {
  const { open } = useMobileSearchBar();
  return (
    <div
      className={`mt-4 lg:hidden px-3 transition-all duration-300 ease-in-out overflow-hidden ${
        open
          ? "animate-accordion-down "
          : "animate-accordion-up pointer-events-none h-0"
      }`}
    >
      <div className="relative">
        <input
          className="h-10 max-w-sm mx-auto w-full rounded-full pl-10 bg-input "
          placeholder="Search a movie or series"
        />
        <Search className="absolute left-3 size-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}
