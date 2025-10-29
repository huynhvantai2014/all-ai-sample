"use client";
import MuiRootProvider from "@/components/MuiRootProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <MuiRootProvider>{children}</MuiRootProvider>;
}
