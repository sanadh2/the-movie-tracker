import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex justify-center items-center flex-col">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <div className="flex justify-center items-center gap-3">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
