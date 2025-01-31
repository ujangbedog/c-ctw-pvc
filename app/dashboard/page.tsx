"use client";

import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <>
      <Navbar />

      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {session?.user?.name}</p>
      </div>
    </>
  );
}
