// src/app/page.tsx
"use client";
import React from "react";
import DealGrid from "@/components/DealGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black text-zinc-800 dark:text-zinc-100">
      <Navbar />
      <main className="flex-1 w-full px-6 py-12 flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-6 text-center">
          Discover Deals, Earn Rewards 🎟️
        </h1>
        <p className="max-w-2xl text-center text-zinc-600 dark:text-zinc-400 mb-10">
          Explore user-owned NFT coupons that unlock discounts and rewards.
          Collect, trade, or redeem them anywhere — powered by Web3.
        </p>
        <DealGrid />
      </main>
      <Footer />
    </div>
  );
}
