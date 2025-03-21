"use client";
import SearchInput from "./search-input";
import { useSearch } from "./useSearch";
import useSearchData from "../../../store/useSearch";
import { useDebounce } from "@uidotdev/usehooks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchIcon, X } from "lucide-react";
import VisuallyHidden from "@/components/ui/visually-hidden";
import SearchList from "./search-list";
import { useEffect, useState } from "react";
import useSearchStore from "./useSearchQuery";

export default function SearchFilmsInMobile() {
  const { search, setSearch } = useSearch();
  const debouncedValue = useDebounce(search, 600);
  const { data, error, isLoading } = useSearchData({
    query: debouncedValue,
  });
  const { addQuery, deleteQuery, searchQueries } =
    useSearchStore(debouncedValue);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (search.trim() !== "" && search === debouncedValue) {
      addQuery();
    }
  }, [debouncedValue, search, addQuery]);
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <SearchIcon />
          <VisuallyHidden>Search</VisuallyHidden>
        </SheetTrigger>
        <SheetContent className="w-[90%]">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Search</SheetTitle>
              <SheetDescription>
                Please enter a keyword to start searching for films.
              </SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <div className=" px-1 pt-5 h-full">
            <SearchInput
              closeDialog={() => setOpen(false)}
              isLoading={isLoading}
              search={search}
              setSearch={useSearch().setSearch}
            />

            <div className=" h-full px-4 overflow-y-scroll no-scrollbar">
              {search.trim() == "" ? (
                <div className="">
                  <div className="flex flex-col justify-center gap-2 p-2">
                    {searchQueries.map((search) => (
                      <div
                        key={search}
                        className="flex items-center justify-between gap-2"
                      >
                        <button
                          key={search}
                          onClick={() => setSearch(search)}
                          className="w-full text-start hover:bg-primary-foreground p-2 rounded"
                        >
                          {search}
                        </button>
                        <button
                          className="size-3"
                          onClick={() => deleteQuery(search)}
                        >
                          <X className="size-3 stroke-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 text-center italic text-yellow-500">
                    please enter a sentence or a word to start search
                  </div>
                </div>
              ) : (
                <SearchList
                  data={data?.movies.results}
                  close={() => setOpen(false)}
                  error={error}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
