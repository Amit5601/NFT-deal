"use client";
import React, { useState } from "react";

interface Deal {
  id: number;
  title: string;
  description: string;
  discount: string;
  expiry: string;
  image: string;
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDeal = { ...form, id: Date.now() };
    setDeals([...deals, newDeal]);
    setForm({ id: 0, title: "", description: "", discount: "", expiry: "", image: "" });
    alert("✅ Deal created successfully (NFT Mint simulated)");
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

          <button
            type="submit"
            className="mt-3 bg-black text-white py-2 rounded-lg hover:bg-zinc-800"
          >
            Mint NFT Deal
          </button>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
