import { Search } from "lucide-react";
import CSS from "@/css/SearchLoader.module.css";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  handleFocusBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  isLoading: boolean;
}

export default function SearchInput({
  handleFocusBlur,
  isLoading,
  search,
  setSearch,
}: Props) {
  return (
    <div className="relative w-full ">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onBlur={handleFocusBlur}
        onFocus={handleFocusBlur}
        className="h-10 rounded-full w-full max-w-96 pl-10 pr-4 bg-input placeholder:text-xs"
        placeholder="Search a movie or series"
      />
      <Search className="absolute left-3 size-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      {isLoading && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className={CSS.loader + " "} />
        </div>
      )}
    </div>
  );
}
