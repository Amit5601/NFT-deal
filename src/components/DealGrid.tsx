// src/components/DealGrid.tsx
"use client";
import React from "react";

const deals = [
  {
    id: 1,
    title: "20% Off Flights ✈️",
    merchant: "CryptoAir",
    discount: "20%",
    expiry: "Dec 31, 2025",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
  },
  {
    id: 2,
    title: "50% Off Pizza 🍕",
    merchant: "PizzaDAO",
    discount: "50%",
    expiry: "Nov 30, 2025",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg",
  },
  
  {
    id: 3,
    title: "30% Off Shoes 👟",
    merchant: "SneakerX",
    discount: "30%",
    expiry: "Jan 15, 2026",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  },
];

export default function DealGrid() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
      {deals.map((deal) => (
        <div
          key={deal.id}
          className="rounded-2xl shadow-md overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
        >
          <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">{deal.title}</h3>
            <p className="text-sm text-zinc-500">{deal.merchant}</p>
            <p className="text-sm mt-1">
              Discount: <span className="font-medium">{deal.discount}</span>
            </p>
            <p className="text-sm text-zinc-500">Expires: {deal.expiry}</p>
            <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-zinc-800">
              Claim NFT
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
