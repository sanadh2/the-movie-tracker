import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";
import { PropsWithChildren } from "react";

export default function VisuallyHidden({ children }: PropsWithChildren) {
  return (
    <VisuallyHiddenPrimitive.Root>{children}</VisuallyHiddenPrimitive.Root>
  );
}
