"use client";

import type React from "react";

import NavbarGest from "@/components/layout/NavbarGest";
import { AuthGuard } from "@/contexts/AutContext";

export default function GestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthGuard>
        <NavbarGest />
        <main className="min-h-screen bg overflow-y-auto">{children}</main>
      </AuthGuard>
    </>
  );
}
