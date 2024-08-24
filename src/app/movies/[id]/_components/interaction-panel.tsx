"use client";

import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";
import React from "react";

export default function InteractionPanel() {
  return (
    <div className="p-5 flex gap-3">
      <Button variant={"outline"} className="w-full gap-1 active:scale-100">
        <Plus className="size-4" /> Review or log
      </Button>
      <Button variant={"destructive"} className="w-full gap-1 active:scale-100">
        <Heart className="size-4" />
        Like
      </Button>
      <Button className="w-full active:scale-100">Add To WatchList</Button>
    </div>
  );
}
