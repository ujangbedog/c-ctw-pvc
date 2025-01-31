"use client";

import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition"
      >
        Sign Out
      </button>
    </nav>
  );
}
