"use client";

import type { ReactNode } from "react";
import type { Content } from "@/lib/types";
import { AppProviders } from "@/components/root/AppProviders";

type Props = {
  children: ReactNode;
  initialContent: Content;
};

export function ClientBoot({ children, initialContent }: Props) {
  return <AppProviders initialContent={initialContent}>{children}</AppProviders>;
}
