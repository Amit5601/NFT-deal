// src/components/Navbar.tsx
"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center bg-white dark:bg-zinc-950 shadow-sm sticky top-0 z-50">
      <Link href="/" className="text-2xl font-semibold">Dealify 🪙</Link>
      <div className="flex gap-6 text-sm">
        <Link href="/merchant">Merchant Dashboard</Link>
        <Link href="/redeem">Redeem</Link>
      </div>
    </nav>
  );
}
