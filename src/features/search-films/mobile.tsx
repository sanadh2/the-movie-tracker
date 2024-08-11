"use client";
import SearchInput from "./search-input";
import { useSearch } from "./useSearch";
import useSearchData from "./useSearchData";
import { useDebounce } from "@uidotdev/usehooks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchIcon } from "lucide-react";
import VisuallyHidden from "@/components/ui/visually-hidden";
import SearchList from "./search-list";
import { useState } from "react";

export default function SearchFilmsInMobile() {
  const { search } = useSearch();
  const debouncedValue = useDebounce(search, 600);
  const { data, error, isLoading } = useSearchData(debouncedValue, [
    search,
    debouncedValue,
  ]);
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <SearchIcon />
          <VisuallyHidden>Search</VisuallyHidden>
        </SheetTrigger>
        <SheetContent className="w-full">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Search</SheetTitle>
              <SheetDescription>
                Please enter a keyword to start searching for films.
              </SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <div className=" px-1 pt-5">
            <SearchInput
              isLoading={isLoading}
              search={search}
              setSearch={useSearch().setSearch}
            />

            <div className="mt-6">
              <SearchList
                close={() => setOpen(false)}
                data={data?.results}
                error={error}
                isLoading={isLoading}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
