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

export default function AddReview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-full gap-1 active:scale-100">
          <Plus className="size-4" /> Review or log
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription></DialogDescription>
          <AddReviewForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
