import PageLayout from "@/components/PageLayout";
import MovieSearchForm from "./form";
import Movies from "./Movies";
import { fetchSearchingMovies } from "@/db/services/tmdb";
import { z } from "zod";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const searchParamsSchema = z.object({
  query: z.string().min(1, { message: "Please enter a search query" }),
  page: z
    .string()
    .regex(/^[1-9][0-9]*$/)
    .default("1"),
  year: z.string().optional(),
  include_adult: z.enum(["true", "false"]).default("false"),
});

export default async function MovieSearch({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const rawParams = await searchParams;
  const parsedResult = searchParamsSchema.safeParse(rawParams);

  const params = parsedResult.success
    ? parsedResult.data
    : {
        ...rawParams,
        ...(parsedResult.error.flatten().fieldErrors.query && {
          query: "batman",
        }),
        ...(parsedResult.error.flatten().fieldErrors.page && { page: "1" }),
        ...(parsedResult.error.flatten().fieldErrors.include_adult && {
          include_adult: "false",
          year: undefined,
        }),
      };

  const data = await fetchSearchingMovies({
    query: params.query!,
    page: params.page,
    year: params.year,
    includeAdult: params.include_adult === "true",
  });
  if (data.total_pages < Number(params.page)) return notFound();
  return (
    <PageLayout className="grid gap-4">
      <MovieSearchForm
        page={data.page}
        total_pages={data.total_pages}
        total_results={data.total_results}
        query={params.query!}
      >
        <Movies initialData={data} />
      </MovieSearchForm>
    </PageLayout>
  );
}
