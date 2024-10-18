"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center flex-col h-80">
      <h2 className="font-mono">{error.message || "Something went wrong"}</h2>
      <Button
        variant={"destructive"}
        className="flex gap-2 mt-2"
        onClick={() => reset()}
      >
        <span className="">Try again</span> <RotateCcw />
      </Button>
    </div>
  );
}
