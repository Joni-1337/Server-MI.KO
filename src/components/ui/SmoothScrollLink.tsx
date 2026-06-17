"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { smoothScrollToHash } from "@/lib/smooth-scroll";

type SmoothScrollLinkProps = ComponentProps<typeof Link>;

export function SmoothScrollLink({ href, onClick, ...props }: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof href === "string" && href.startsWith("#")) {
      e.preventDefault();
      smoothScrollToHash(href);
    }
    onClick?.(e);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
