"use client";

import { AnchorProvider } from "@coral-xyz/anchor";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";

/**
 * Returns an AnchorProvider bound to devnet by default.
 */
export function makeProvider(
  wallet: WalletContextState,
  connection?: Connection
) {
  const conn = connection ?? new Connection(clusterApiUrl("devnet"), "confirmed");
  return new AnchorProvider(conn, wallet as any, AnchorProvider.defaultOptions());
}
