"use server";

import { revalidateTag, revalidatePath } from "next/cache";

export default async function revalidateFetch(collection: string) {
  revalidateTag(collection);
}

export async function revalidatePage(path: string) {
  console.log(`\x1b[34mpath ${path} revalidated\x1b[0m`);
  revalidatePath("/" + path, "page");
}
