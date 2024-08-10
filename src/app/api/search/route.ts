import fetchWithAuth from "@/lib/fetch-with-auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const data = await fetchWithAuth(
    `/search/movie?query=${query}&include_adult=true`
  );
  return NextResponse.json(await data.json(), { status: data.status });
}
