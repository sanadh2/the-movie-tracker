import Link from "next/link";
import getMovieCatchphrase from "./components/movieCatchphrases";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-[80vh] flex justify-center items-center flex-col gap-4">
      <p className="text-3xl font-semibold">{getMovieCatchphrase()}</p>
      <p className="text-xl text-red-500">
        &#123;-Could not find requested resource-&#125;
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
