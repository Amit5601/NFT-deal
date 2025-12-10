"use client";
import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { makeProvider } from "@/lib/makeProvider";
import { createDeal, createMarket } from "@/lib/prediction";
import { sha256Bytes, toHex } from "@/lib/crypto";

interface Deal {
  id: number;
  title: string;
  description: string;
  discount: string;
  expiry: string;
  image: string;
  // ui-only fields:
  secretHex?: string | null;
  dealIdHex?: string | null;
  tx?: string | null;
}

export default function MerchantDashboard() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [form, setForm] = useState<Deal>({
    id: 0,
    title: "",
    description: "",
    discount: "",
    expiry: "",
    image: "",
    secretHex: null,
    dealIdHex: null,
    tx: null,
  });

  const { connection } = useConnection();
  const wallet = useWallet();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //(keeps UX intact) + optional on-chain createDeal call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save local deal entry as before
    const newDeal: Deal = { ...form, id: Date.now(), secretHex: null, dealIdHex: null, tx: null };
    setDeals((prev) => [...prev, newDeal]);

    // Reset form fields
    setForm({ id: 0, title: "", description: "", discount: "", expiry: "", image: "", secretHex: null, dealIdHex: null, tx: null });

    // Notify merchant locally
    alert("✅ Deal saved locally. Now creating on-chain deal (if wallet connected).");

    // If wallet connected, create on-chain deal and generate secret/QR
    if (!wallet.connected || !wallet.publicKey) {
      // not connected: merchant can still copy the deal data from the UI and create later
      alert("Wallet not connected. Connect wallet to create on-chain deal and generate redeem QR.");
      return;
    }

    try {
      const provider = makeProvider(wallet, connection);

      // create a random 8-byte deal id
      const dealId = new Uint8Array(8);
      crypto.getRandomValues(dealId);
      // create a random 32-byte secret and hash it
      const secret = new Uint8Array(32);
      crypto.getRandomValues(secret);
      const secretHash = await sha256Bytes(secret);

      // call on-chain createDeal
      const res = await createDeal(provider, dealId, secretHash);
      if (!res.success) {
        alert("On-chain createDeal failed: " + res.error);
        return;
      }

      const secretHex = toHex(secret);
      const dealIdHex = Array.from(dealId).map((b) => b.toString(16).padStart(2, "0")).join("");

      // update the most-recent local deal entry with tx and secret info
      setDeals((prev) => {
        const copy = [...prev];
        const idx = copy.findIndex((d) => d.id === newDeal.id);
        if (idx !== -1) {
          copy[idx] = { ...copy[idx], secretHex, dealIdHex, tx: res.tx ?? null };
        }
        return copy;
      });

      // show result and QR URL for merchant to copy/share
      alert(`Deal created on-chain. tx: ${res.tx}\nSecret (hex): ${secretHex}\nDealId (hex): ${dealIdHex}`);
    } catch (err: any) {
      console.error("createDeal error", err);
      alert("Exception while creating on-chain deal: " + String(err?.message ?? err));
    }
  };

  
  const handleCreateMarket = async () => {
    if (!wallet.connected || !wallet.publicKey) return alert("Connect wallet first");
    try {
      const provider = makeProvider(wallet, connection);
      const marketId = new Uint8Array(8);
      crypto.getRandomValues(marketId);
      const expiresAt = Math.floor(Date.now() / 1000 + 60 * 60); // 1 hour
      const res = await createMarket(provider, marketId, "Merchant-created market", expiresAt);
      if (!res.success) return alert("createMarket failed: " + res.error);
      alert("Market created. marketId (hex): " + Array.from(marketId).map((b) => b.toString(16).padStart(2, "0")).join(""));
    } catch (e: any) {
      alert("createMarket error: " + String(e?.message ?? e));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">Merchant Dashboard 🧾</h1>

      {/* Create Deal Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800"
      >
        <h2 className="text-xl font-medium mb-4">Create a New Deal</h2>

        <div className="flex flex-col gap-4">
          <input
            name="title"
            placeholder="Deal Title (e.g., 20% Off Flights)"
            value={form.title}
            onChange={handleChange}
            required
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800"
          />
          <textarea
            name="description"
            placeholder="Short description"
            value={form.description}
            onChange={handleChange}
            required
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800"
          />
          <input
            name="discount"
            placeholder="Discount (e.g., 20%)"
            value={form.discount}
            onChange={handleChange}
            required
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800"
          />
          <input
            name="expiry"
            placeholder="Expiry Date (e.g., 2025-12-31)"
            value={form.expiry}
            onChange={handleChange}
            required
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800"
          />

          <div className="flex gap-3 items-center">
            <button
              type="submit"
              className="mt-3 bg-black text-white py-2 rounded-lg hover:bg-zinc-800"
            >
              Create Deal (on-chain if wallet connected)
            </button>

            <button
              type="button"
              className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg"
              onClick={handleCreateMarket}
            >
              Create Market (demo)
            </button>
          </div>
        </div>
      </form>

      {/* Deal List */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-xl font-medium mb-4">Your Deals</h2>
        {deals.length === 0 ? (
          <p className="text-zinc-500">No deals created yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="rounded-xl shadow-md overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              >
                {deal.image && (
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{deal.title}</h3>
                  <p className="text-sm text-zinc-500 mb-1">{deal.description}</p>
                  <p className="text-sm">
                    Discount: <span className="font-medium">{deal.discount}</span>
                  </p>
                  <p className="text-sm text-zinc-500">Expires: {deal.expiry}</p>

                  {/* On-chain info + QR */}
                  {deal.secretHex && (
                    <div className="mt-3">
                      <p className="text-xs text-zinc-400">Secret (hex):</p>
                      <p className="font-mono break-all text-sm">{deal.secretHex}</p>
                      <p className="mt-1 text-xs text-zinc-400">DealId (hex): <span className="font-mono">{deal.dealIdHex}</span></p>
                      <p className="mt-2 text-sm">
                        QR URL example: <span className="font-mono break-all">{`${location.origin}/redeem?secret=${deal.secretHex}&merchant=${wallet.publicKey?.toBase58() ?? ""}&dealId=${deal.dealIdHex}`}</span>
                      </p>
                      {deal.tx && <p className="mt-2 text-xs text-zinc-500">tx: {deal.tx}</p>}
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
