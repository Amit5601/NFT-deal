"use client";
import React, { useState } from "react";

export default function RedeemPage() {
  const [couponId, setCouponId] = useState("");
  const [redeemedCoupons, setRedeemedCoupons] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!couponId.trim()) {
      setMessage("⚠️ Please enter a valid coupon ID.");
      return;
    }

    if (redeemedCoupons.includes(couponId)) {
      setMessage("❌ Coupon already redeemed.");
      return;
    }

    // Simulate on-chain redemption
    setRedeemedCoupons([...redeemedCoupons, couponId]);
    setMessage(`✅ Coupon ${couponId} redeemed successfully!`);
    setCouponId("");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Redeem NFT Coupon 🎫
      </h1>

      <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800">
        <p className="text-zinc-500 mb-4 text-sm text-center">
          Enter or scan a coupon ID to verify and redeem it.
        </p>

        <form onSubmit={handleRedeem} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter NFT Coupon ID"
            value={couponId}
            onChange={(e) => setCouponId(e.target.value)}
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-lg hover:bg-zinc-800"
          >
            Redeem Coupon
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm">
            {message.startsWith("✅") ? (
              <span className="text-green-500">{message}</span>
            ) : message.startsWith("❌") ? (
              <span className="text-red-500">{message}</span>
            ) : (
              <span className="text-yellow-500">{message}</span>
            )}
          </p>
        )}
      </div>

      {/* Redeemed Coupons */}
      {redeemedCoupons.length > 0 && (
        <div className="max-w-2xl mx-auto mt-10">
          <h2 className="text-lg font-medium mb-4">Redeemed Coupons</h2>
          <ul className="space-y-2 text-sm">
            {redeemedCoupons.map((id) => (
              <li
                key={id}
                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 flex justify-between items-center"
              >
                <span>Coupon ID: {id}</span>
                <span className="text-green-500 font-medium">Redeemed</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
