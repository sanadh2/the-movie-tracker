"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center flex-col h-80">
      <h2 className="font-mono text-xl text-red-500">
        {error.message || "Something went wrong"}
      </h2>
      <div className="flex gap-2 item-center mt-2">
        <Button
          variant={"shine"}
          className="flex gap-2"
          onClick={() => reset()}
        >
          <span className="">Try again</span> <RotateCcw />
        </Button>
        <Button onClick={handleBack}>Go Back</Button>
      </div>
    </div>
  );
}
