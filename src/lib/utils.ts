import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AsyncResult<T> {
  data: T;
}
export async function asyncWrapper<T>(
  asyncFunc: () => Promise<T>
): Promise<AsyncResult<T>> {
  try {
    const data = await asyncFunc();
    return { data };
  } catch (e) {
    console.log(e);
    throw new Error("Something went wrong");
  }
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
