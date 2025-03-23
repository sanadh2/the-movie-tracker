"use server";

import { revalidateTag, revalidatePath } from "next/cache";

export default async function revalidateFetch(collection: string) {
  revalidateTag(collection);
}

export async function revalidatePage(path: string) {
  revalidatePath("/" + path);
}
