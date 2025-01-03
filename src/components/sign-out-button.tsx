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
import Image from "next/image";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
export default function SignOutButton({ user }: { user: User }) {
  const [modal, setModal] = useState(false);
  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger className="">SignOut</DialogTrigger>
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
