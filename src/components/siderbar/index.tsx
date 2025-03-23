"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "next-auth";
import Image from "next/image";
import VisuallyHidden from "../ui/visually-hidden";
import React from "react";
import { SuperLink } from "../super-link";
import { UserIcon, HomeIcon, BookmarkIcon, HeartIcon } from "lucide-react";
import SignOutButton from "@/components/sign-out-button";

const links: {
  name: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Profile",
    href: "/",
    icon: <UserIcon />,
  },
  {
    name: "Watchlist",
    href: "/watchlist",
    icon: <BookmarkIcon />,
  },
  {
    name: "Favorites",
    href: "/favorites",
    icon: <HeartIcon />,
  },
];

export function Sidebar({ user }: { user: User }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Image
          alt="avatar"
          height={40}
          width={40}
          title={user?.name || ""}
          priority
          src={user?.image || "/default-avatar.png"}
          onError={(e) => {
            e.currentTarget.src = "/default-avatar.png";
            e.currentTarget.onerror = null;
          }}
          className="w-8 h-8 rounded-full object-cover"
        />
      </SheetTrigger>
      <SheetContent className="w-64 p-0">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>This is sidebar</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        <div className="space-y-2 p-2">
          <div className="flex p-1 items-center">
            <Image
              alt="avatar"
              height={80}
              width={80}
              title={user?.name || ""}
              priority
              src={user?.image || "/default-avatar.png"}
              onError={(e) => {
                e.currentTarget.src = "/default-avatar.png";
                e.currentTarget.onerror = null;
              }}
              className="size-10 rounded-full object-cover"
            />
            <div className="flex flex-col ml-2">
              <span className="font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
          <hr />

          {links.map((link) => (
            <div
              key={link.name}
              className="flex gap-2 items-center p-2 hover:bg-muted rounded-md"
            >
              {link.icon}
              <SuperLink
                href={link.href}
                onClick={() => setOpen(false)}
                className="w-full"
              >
                {link.name}
              </SuperLink>
            </div>
          ))}
          <SignOutButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}
