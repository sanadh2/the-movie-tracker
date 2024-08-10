import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export default function PageLayout({ className, children }: Props) {
  return (
    <div className={cn("p-3 md:p-5 lg:p-7 xl:p-10 2xl:p-14 ", className)}>
      {children}
    </div>
  );
}
