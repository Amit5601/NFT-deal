# 🪙 Dealify — Web3 Deal Discovery & Loyalty Platform

Create and redeem cryptographically verifiable deals with no backend.

Dealify is a decentralized deal system where merchants can create on-chain offers and users can redeem them using a secret-based verification mechanism.
The project demonstrates how Web3 commerce can work without servers, databases, or Web2 authentication.

This submission focuses on:

Deal creation on Solana

Secure redemption using Anchor PDAs + hashed secrets

Merchant and user UI built with Next.js + wallet adapters

🚀 Current Features (Hackathon Release)
1. Merchant Dashboard (fully working)

Merchants can:

Create on-chain deals

Generate dealId (random 8 bytes)

Generate secret + hashed secret (secure one-time redemption)

Store deal metadata in UI

Sign transactions with Phantom

Deal creation directly interacts with the deployed Solana program.

2. On-chain Deal Redemption (fully working)

Users (or merchants scanning user screens) can:

Enter secret (hex)

Enter deal ID (hex)

Enter merchant address

Redeem deal on-chain through the Anchor program

Receive confirmation if the hash matches and deal is still valid

Redemption cannot be replayed because the program enforces one-time usage.

3. Zero backend infrastructure

No servers

No databases

No APIs

All logic runs on the blockchain

Next.js App Router with client components and Solana wallet integration

🧩 Architecture Overview
Merchant creates deal
 → Generates dealId (8 bytes)
 → Generates secret (32 bytes)
 → Secret is hashed and stored on-chain

User wants to redeem
 → Inputs dealId + secret
 → Program recomputes hash
 → If match → redeem success
 → If mismatch → fail


A clean and secure approach that proves the concept of verifiable deals without NFT minting for now.

🌱 Future Enhancements (Not yet included but planned)

These are not implemented yet but outline the direction of the project.

1. NFT Coupon Minting

Mint deals as NFTs (SPL tokens) that users can:

Trade

Transfer

Showcase in wallets

2. QR Code Flow

Generate QR codes containing:

secret

dealId

merchant address

Users simply scan → redeem.
Current version supports manual entry only.

3. Deal Marketplace UI

View, purchase, and collect deals in a marketplace format.

4. On-chain Metadata / IPFS Storage

Store deal metadata more persistently.

🔧 Tech Stack
Frontend

Next.js 14 (App Router)

React

TailwindCSS

Solana Wallet Adapter (Phantom, Solflare, etc.)

Smart Contract

Anchor Framework

PDA-based deal accounts

Secure hashed secret validation

No token minting yet (future feature)

🔗 Solana Program (Deployed)

Program ID:

9Q11k5nmhC2f6deR2Kh7jSu1yN642tgkVggtitNWDeH7

🖥️ Local Setup
Install dependencies
npm install

Run dev server
npm run dev


App runs at:

http://localhost:3000

🎥 Demo Video

(Upload the trailer and paste link here)

🌐 Deployment

Frontend hosted on Vercel
(https://nft-deal.vercel.app/)

🛡️ Security Notes

Inputs validated on client

No private key or program keypair committed

Only public program ID included

Secret is never stored, only hashed

Each redemption is one-time only

🏆 Hackathon Value Proposition

Dealify demonstrates:

On-chain deal verification

Backend-less Web3 commerce flow

Merchant dashboards powered by Solana

Practical use case beyond DeFi and gaming

Even without NFT minting or QR codes, the core idea works end-to-end on-chain.

👤 Author

Amit Singhmar
Web3 Developer
Solana • Anchor • Rust • Next.js • TypeScript


