"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export default function DropdownSearch() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="absolute cursor-pointer left-3 size-4 top-1/2 -translate-y-1/2"
      >
        <Search />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full left-full">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
