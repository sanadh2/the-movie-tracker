"use client";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export default function Logout() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Logout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LogoutLink postLogoutRedirectURL="/">Logout</LogoutLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
