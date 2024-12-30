import { Search } from "lucide-react";
import CSS from "@/css/SearchLoader.module.css";
import { cn } from "@/lib/utils";
import { KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  handleFocusBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  isLoading: boolean;
  className?: string;
  closeDialog: () => void;
}

export default function SearchInput({
  handleFocusBlur,
  isLoading,
  search,
  setSearch,
  className,
  closeDialog,
}: Props) {
  const router = useRouter();
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      router.replace("/movie-search?query=" + search);
      closeDialog();
    }
  };
  return (
    <div className="relative w-full ">
      <input
        type="search"
        value={search}
        onKeyDown={onKeyDown}
        onChange={(e) => setSearch(e.target.value)}
        onBlur={handleFocusBlur}
        onFocus={handleFocusBlur}
        className={cn(
          "h-10 rounded-full truncate w-full pl-10 pr-4 bg-input/50 text-opacity-100 placeholder:text-xs",
          className
        )}
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
