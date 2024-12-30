"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import useSearchStore from "./useSearchQuery";
import { useSearch } from "./useSearch";
import { useDebounce } from "@uidotdev/usehooks";
import useSearchData from "@/store/useSearch";
import SearchInput from "./search-input";
import { SearchIcon, X } from "lucide-react";
import VisuallyHidden from "@/components/ui/visually-hidden";
import SearchList from "./search-list";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const { search, setSearch } = useSearch();
  const debouncedValue = useDebounce(search, 600);
  const { addQuery, deleteQuery, searchQueries } =
    useSearchStore(debouncedValue);
  const { data, error, isLoading } = useSearchData({
    query: debouncedValue,
  });
  useEffect(() => {
    if (search.trim() !== "" && search === debouncedValue) {
      addQuery();
    }
  }, [debouncedValue, search, addQuery]);

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        setOpen(e);
      }}
    >
      <DialogTrigger className="outline-none">
        <div className="relative w-full">
          <div className="h-10 rounded-full w-full cursor-text max-w-96 pl-10 pr-4 text-muted-foreground text-xs flex justify-center items-center bg-input/50 text-opacity-100">
            {search.trim() ? search : "Search a movie or series"}
          </div>
          <SearchIcon className="absolute left-3 size-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 m-0 gap-0">
        <VisuallyHidden>
          <DialogHeader className="">
            <DialogTitle>Search Movies</DialogTitle>
            <DialogDescription>
              Please enter a keyword to start searching for films.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <SearchInput
          isLoading={isLoading}
          search={search}
          setSearch={setSearch}
          closeDialog={() => setOpen(false)}
          className="w-full min-w-max rounded-none border-0 border-b-[1px] border-b-background outline-none bg-transparent"
        />
        <div className="h-80 px-4 overflow-y-scroll no-scrollbar">
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
      </DialogContent>
    </Dialog>
  );
}
