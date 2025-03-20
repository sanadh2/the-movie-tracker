import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchParams } from "./page";

export default function Pagination({
  searchParams,
  currentPage,
  totalPages,
}: {
  searchParams: SearchParams;
  currentPage: number;
  totalPages: number;
}) {
  const updatedQueryParams = new URLSearchParams(searchParams);
  updatedQueryParams.set("page", String(currentPage - 1));

  const nextQueryParams = new URLSearchParams(
    searchParams as Record<string, string>
  );
  nextQueryParams.set("page", String(currentPage + 1));

  return (
    <div className="flex justify-center gap-4">
      <Button disabled={currentPage < 2} asChild={currentPage >= 2}>
        {currentPage < 2 ? (
          "back"
        ) : (
          <Link href={`?${updatedQueryParams.toString()}`}>back</Link>
        )}
      </Button>
      <Button disabled className="">
        {currentPage}
      </Button>
      <Button
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage >= totalPages ? (
          "next"
        ) : (
          <Link href={`?${nextQueryParams.toString()}`}>next</Link>
        )}
      </Button>
    </div>
  );
}
