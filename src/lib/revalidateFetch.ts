"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateFetch(collection: string) {
  revalidateTag(collection);
}
