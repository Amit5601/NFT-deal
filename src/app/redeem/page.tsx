"use client";

import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { makeProvider } from "@/lib/makeProvider";
import { redeemDeal } from "@/lib/prediction";
import { fromHex } from "@/lib/crypto";
import { useSearchParams } from "next/navigation";
import { PublicKey } from "@solana/web3.js";


export default function RedeemPage() {
  const search = useSearchParams();

  const qrSecret = search.get("secret") ?? "";
  const qrMerchant = search.get("merchant") ?? "";
  const qrDealId = search.get("dealId") ?? "";

  const [secret, setSecret] = useState(qrSecret);
  const [merchant, setMerchant] = useState(qrMerchant);
  const [dealIdHex, setDealIdHex] = useState(qrDealId);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { connection } = useConnection();
  const wallet = useWallet();

  useEffect(() => {
    if (qrSecret || qrDealId) {
      setMessage("Loaded QR details. Connect wallet to redeem.");
    }
  }, [qrSecret, qrDealId]);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wallet.connected || !wallet.publicKey) {
      setMessage("❌ Connect your wallet first.");
      return;
    }

    if (!secret.trim() || !dealIdHex.trim()) {
      setMessage("⚠️ Missing secret or deal ID.");
      return;
    }

    if (!merchant.trim()) {
      setMessage("⚠️ Missing merchant address.");
      return;
    }

    try {
      setLoading(true);
      setMessage("⏳ Redeeming deal on-chain…");

      const secretBytes = fromHex(secret);
      const dealIdBytes = fromHex(dealIdHex);
      const merchantPubkey = new PublicKey(merchant.trim());

      const provider = makeProvider(wallet, connection);

      const res = await redeemDeal(
        provider,
        merchantPubkey,
        dealIdBytes,
        secretBytes
      );

      if (!res.success) {
        setMessage("❌ On-chain error: " + res.error);
      } else {
        setMessage(`✅ Successfully redeemed! tx: ${res.tx}`);
      }
    } catch (err: any) {
      setMessage("❌ Exception: " + (err?.message ?? String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">Redeem NFT Coupon 🎫</h1>

      <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800">
        <p className="text-zinc-500 mb-4 text-sm text-center">
          Scan a QR or enter the secret code to redeem your deal.
        </p>

        <form onSubmit={handleRedeem} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Secret (hex)"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm"
            required
          />

          <input
            type="text"
            placeholder="Deal ID (hex)"
            value={dealIdHex}
            onChange={(e) => setDealIdHex(e.target.value)}
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm"
            required
          />

          {/**/}
          <input
            type="text"
            placeholder="Merchant (optional)"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 rounded-lg hover:bg-zinc-800"
          >
            {loading ? "Processing…" : "Redeem Coupon"}
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
    </div>
  );
}
