"use client";
import useSearchData from "@/store/useSearch";
import Loader from "@/components/loader/index";
import { MovieSearchFormData } from "./form";
import { Button as MainButton } from "@/components/ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Button = ({ ...props }: React.ComponentProps<typeof MainButton>) => (
  <MainButton variant={"ghost"} {...props} type="button" />
);

export default function Pagination({
  initialData,
  page,
  total_pages,
  total_results,
}: {
  initialData: MovieSearchFormData;
  page: number;
  total_pages: number;
  total_results: number;
}) {
  const { data, isLoading } = useSearchData(initialData);
  const currentPage = data?.movies.page || page;
  const totalPages = data?.movies.total_pages || total_pages;
  const totalResults = data?.movies.total_results || total_results;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updatePage = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="mt-5 w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="border p-3 rounded">
          <div className=" flex justify-center gap-1">
            <Button
              className="pl-2.5 gap-1"
              disabled={currentPage == 1}
              onClick={() =>
                router.push(
                  pathname + "?" + updatePage((currentPage - 1).toString())
                )
              }
            >
              <ChevronFirst className="h-4 w-4" />
            </Button>
            <Button
              className="pl-2.5 gap-1"
              disabled={currentPage == 1}
              onClick={() =>
                router.push(
                  pathname + "?" + updatePage((currentPage - 1).toString())
                )
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {currentPage !== 1 && (
              <Button
                onClick={() =>
                  router.push(
                    pathname + "?" + updatePage((currentPage - 1).toString())
                  )
                }
              >
                {currentPage - 1}
              </Button>
            )}
            <Button
              disabled
              className="disabled:opacity-100 "
              variant={"default"}
            >
              {currentPage}
            </Button>

            <Button
              disabled={currentPage == totalPages}
              onClick={() =>
                router.push(
                  pathname + "?" + updatePage((currentPage + 1).toString())
                )
              }
              className="pr-2.5 gap-1"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              disabled={currentPage == totalPages}
              onClick={() =>
                router.push(pathname + "?" + updatePage(totalPages.toString()))
              }
              className="pr-2.5 gap-1"
            >
              <ChevronLast className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center items-center mt-3">
            <p className="text-center">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
