import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "./prediction_deal.json"; 

const PROGRAM_ID = new PublicKey((idl as any).address);

//convert Uint8Array | number[] | ArrayBuffer -> number[]
function toNumberArray(src: Uint8Array | number[] | ArrayBuffer): number[] {
  if (src instanceof Uint8Array) return Array.from(src);
  if (Array.isArray(src)) return src;
  return Array.from(new Uint8Array(src));
}

type Result =
  | { success: true; tx: string }
  | { success: false; error: string };

// Create an Anchor Program 
function programFor(provider: anchor.AnchorProvider) {
  return new Program(idl as any, provider);
}

/**
 */
export async function createMarket(
  provider: anchor.AnchorProvider,
  marketId: Uint8Array | number[],
  question: string,
  expiresAt: number
): Promise<Result> {
  try {
    const program = programFor(provider);
    const marketIdArr = toNumberArray(marketId);

    const [marketPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("market"), Buffer.from(marketIdArr)],
      PROGRAM_ID
    );

    const expiresBN = new anchor.BN(expiresAt);

    const tx = await program.methods
      .createMarket(marketIdArr, question, expiresBN)
      .accounts({
        market: marketPDA,
        creator: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    return { success: true, tx };
  } catch (err: any) {
    console.error("createMarket error:", err);
    return { success: false, error: String(err?.message ?? err) };
  }
}

/**
 */
export async function createDeal(
  provider: anchor.AnchorProvider,
  dealId: Uint8Array | number[],
  secretHash: Uint8Array | number[]
): Promise<Result> {
  try {
    const program = programFor(provider);
    const dealIdArr = toNumberArray(dealId);
    const secretHashArr = toNumberArray(secretHash);

    const [dealPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("deal"), Buffer.from(dealIdArr)],
      PROGRAM_ID
    );

    const tx = await program.methods
      .createDeal(dealIdArr, secretHashArr)
      .accounts({
        deal: dealPDA,
        merchant: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    return { success: true, tx };
  } catch (err: any) {
    console.error("createDeal error:", err);
    return { success: false, error: String(err?.message ?? err) };
  }
}

/**
 */
export async function redeemDeal(
  provider: anchor.AnchorProvider,
  merchantPubkey: PublicKey,
  dealId: Uint8Array | number[],
  secret: Uint8Array | number[]
): Promise<Result> {
  try {
    const program = programFor(provider);
    const dealIdArr = toNumberArray(dealId);
    const secretArr = toNumberArray(secret);

    const [dealPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("deal"), Buffer.from(dealIdArr)],
      PROGRAM_ID
    );

    const tx = await program.methods
      .redeemDeal(secretArr)
      .accounts({
        deal: dealPDA,
        merchant: merchantPubkey,
        redeemer: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    return { success: true, tx };
  } catch (err: any) {
    console.error("redeemDeal error:", err);
    return { success: false, error: String(err?.message ?? err) };
  }
}
