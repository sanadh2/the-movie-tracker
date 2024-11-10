import { fetchSearchingMovies } from "@/db/services/tmdb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const searchParamsSchema = z.object({
  query: z.string().min(1, { message: "Please enter a search query" }),
  page: z
    .string()
    .regex(/^[1-9][0-9]*$/)
    .default("1"),
  year: z.string().optional().nullable(),
  include_adult: z.enum(["true", "false"]).default("false"),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawParams = {
      query: searchParams.get("query"),
      page: searchParams.get("page"),
      year: searchParams.get("year"),
      include_adult: searchParams.get("include_adult"),
    };

    const parsedResult = searchParamsSchema.safeParse(rawParams);

    const params = parsedResult.success
      ? parsedResult.data
      : {
          query: rawParams.query || "",
          page: rawParams.page?.match(/^[1-9][0-9]*$/) ? rawParams.page : "1",
          year: rawParams.year || null,
          include_adult:
            rawParams.include_adult === "true" ||
            rawParams.include_adult === "false"
              ? rawParams.include_adult
              : "false",
        };

    const queryValidation = z.string().min(1).safeParse(params.query);
    if (!queryValidation.success) {
      return NextResponse.json(
        {
          message: "Invalid query: Please enter a search query",
          errors: queryValidation.error,
        },
        { status: 400 }
      );
    }
    const movies = await fetchSearchingMovies({
      query: params.query!,
      page: params.page!,
      year: params.year!,
      includeAdult: params.include_adult! === "true",
    });

    return NextResponse.json(
      { movies, message: "Search Results" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
