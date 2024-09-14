"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React from "react";
import AddReview from "./add-review";

export default function InteractionPanel({ movieID }: { movieID: number }) {
  return (
    <div className="p-5 flex gap-3">
      <AddReview movieID={movieID} />
      <Button variant={"destructive"} className="w-full gap-1 active:scale-100">
        <Heart className="size-4" />
        Like
      </Button>
      <Button className="w-full active:scale-100">Add To WatchList</Button>
    </div>
  );
}
