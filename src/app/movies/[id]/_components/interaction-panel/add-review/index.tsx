"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddReviewForm from "./add-review-form";
import { useState } from "react";

export default function AddReview({ movieID }: { movieID: number }) {
  const [modal, setModal] = useState(false);
  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-full gap-1 active:scale-100">
          <Plus className="size-4" /> Review or log
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>Add a review for this movie</DialogDescription>
          <div className="pt-8">
            <AddReviewForm close={() => setModal(false)} movieID={movieID} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
