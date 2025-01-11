"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { PowerIcon } from "lucide-react";
export default function SignOutButton() {
  const [modal, setModal] = useState(false);
  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger className="flex gap-2 items-center p-2 hover:bg-muted rounded-md w-full">
        <PowerIcon className="size-5" />
        <p className="">SignOut</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <Button
              variant={"destructive"}
              onClick={async () =>
                await signOut({ redirect: false })
                  .then(() => setModal(false))
                  .then(() => {
                    window.location.reload();
                  })
              }
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
