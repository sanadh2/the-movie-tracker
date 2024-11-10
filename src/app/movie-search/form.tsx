"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "./pagination";

export const schema = z.object({
  query: z.string().min(1, { message: "Please enter a search query" }),
  page: z
    .string()
    .regex(/^[1-9][0-9]*$/)
    .optional(),
  year: z.string().optional(),
  include_adult: z.enum(["true", "false"]).optional(),
});

export type MovieSearchFormData = z.infer<typeof schema>;

const years = Array.from(
  { length: 100 },
  (_, index) => new Date().getFullYear() - index
);

export default function MovieSearchForm({
  children,
  page,
  total_pages,
  total_results,
  query,
}: {
  children: React.ReactNode;
  page: number;
  total_pages: number;
  total_results: number;
  query: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialData: MovieSearchFormData = {
    query: searchParams.get("query") || query,
    page: searchParams.get("page") || "1",
    year: searchParams.get("year") || "",
    include_adult:
      searchParams.get("include_adult") == "true" ? "true" : "false",
  };

  const { success, error } = schema.safeParse(initialData);
  if (!success) {
    error.errors.map((e) => {
      if (e.path.includes("page")) {
        initialData.page = "1";
      }
      if (e.path.includes("year")) {
        initialData.year = "";
      }
      if (e.path.includes("include_adult")) {
        initialData.include_adult = "false";
      }
    });
  }

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<MovieSearchFormData>({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<MovieSearchFormData> = (data) => {
    const { query, include_adult, year } = data;
    router.push(
      `/movie-search?query=${encodeURIComponent(
        query
      )}&page=0&year=${year}&include_adult=${include_adult}`
    );
  };

  return (
    <div className="">
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex justify-center items-center gap-4">
            <input
              {...register("query")}
              placeholder="Search"
              className="border w-full h-10 rounded bg-transparent px-3"
            />
            {errors.query && (
              <p className="text-red-500">{errors.query.message}</p>
            )}

            <Select
              onValueChange={(e) => setValue("year", e)}
              defaultValue={initialData.year || years[0].toString()} // Set default correctly
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" " className="h-10" disabled>
                  Year
                </SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(e) =>
                setValue("include_adult", e === "true" ? "true" : "false")
              }
              defaultValue={initialData.include_adult}
            >
              <SelectTrigger className="w-80">
                <SelectValue placeholder="Include Adult" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false" className="h-10">
                  No
                </SelectItem>
                <SelectItem value="true" className="h-10">
                  Yes
                </SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Submit</Button>
          </div>
          {children}
          <Pagination
            initialData={initialData}
            page={page}
            total_pages={total_pages}
            total_results={total_results}
          />
        </form>
        {errors.include_adult && (
          <p className="text-red-500">{errors.include_adult.message}</p>
        )}
      </div>
    </div>
  );
}
