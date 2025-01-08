"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ComponentPropsWithRef } from "react";

export const SuperLink = (props: ComponentPropsWithRef<typeof Link>) => {
  const router = useRouter();
  const strHref = typeof props.href === "string" ? props.href : props.href.href;
  return (
    <Link
      {...props}
      prefetch={false}
      onMouseEnter={(e) => {
        if (strHref) {
          void router.prefetch(strHref);
        }
        return props.onMouseEnter?.(e);
      }}
    />
  );
};
