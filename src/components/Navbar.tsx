"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
const WalletConnect = dynamic(() => import("@/components/WalletConnect"), { ssr: false });

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between bg-transparent">
      {/* Left: brand */}
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-semibold">
          Dealify <span className="ml-1">🪙</span>
        </Link>

        {/* center links*/}
        <div className="hidden md:flex gap-6 text-sm">
          <Link href="/merchant" className="hover:underline">Merchant Dashboard</Link>
          <Link href="/redeem" className="hover:underline">Redeem</Link>
        </div>
      </div>

      {/*wallet button */}
      <div className="flex items-center gap-4">
        {/* */}
        <WalletConnect />
      </div>
    </nav>
  );
}
