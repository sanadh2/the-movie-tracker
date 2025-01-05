import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export default function PageLayout({ className, children }: Props) {
  return (
    <div
      className={cn(
        "p-1 md:p-3 lg:p-5 xl:p-7 2xl:p-14 container mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
