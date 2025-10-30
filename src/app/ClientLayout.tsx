"use client";
import MuiRootProvider from "@/components/MuiRootProvider";
import ClientOnly from "@/components/ClientOnly";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <MuiRootProvider>{children}</MuiRootProvider>
    </ClientOnly>
  );
}
