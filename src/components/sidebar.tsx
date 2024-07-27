"use client";
import { useMobileSearchBar } from "@/hooks/useMobileSearchBar";
import { Search, SidebarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
export default function Sidebar() {
  const { close } = useMobileSearchBar();
  const { getUser } = useKindeBrowserClient();
  const user = getUser;
  return (
    <div className="lg:hidden border p-3 flex justify-between items-center">
      <Button size={"icon"} variant={"ghost"}>
        <SidebarIcon />
      </Button>
      <h1>TMT</h1>
      <Search onClick={close} />
    </div>
  );
}
