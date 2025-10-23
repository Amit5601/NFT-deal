# 🪙 Dealify — Web3 Deal Discovery & Loyalty Platform

🔗 **Live Demo:** [https://nft-deal.vercel.app](https://nft-deal.vercel.app)  
💻 **Code Repository:** [https://github.com/Amit5601/NFT-deal](https://github.com/Amit5601/NFT-deal)

---

## 💡 Mission  
Dealify reimagines how discounts work — turning them into **collectible, tradable NFT coupons**.  
It’s the Web3 evolution of Groupon: **user-owned, borderless, and transparent**.

Merchants mint NFT-based deals.  
Users claim, collect, trade, or redeem them globally — all with verifiable ownership and redemption tracking.

---

## 🧠 Problem Statement  
Traditional deal platforms (like Groupon) are centralized.  
Coupons are non-transferable, easily lost, and expire silently.  
Dealify fixes this by turning each promotion into a **verifiable digital asset**.

> Every discount becomes an NFT — liquid, transparent, and user-owned.

---

## 🚀 Overview  
Dealify is a Web3-powered **deal discovery and loyalty platform** that enables:  
- **Merchants** to mint verifiable NFT coupons.  
- **Users** to discover, claim, and redeem deals easily.  
- **Global portability** of discounts across users and platforms.

---

## ✨ Features  

### 🧾 Merchant Dashboard  
Create NFT-based deals with title, description, discount %, expiry date, and image.  
In a full integration, this would mint NFTs with metadata stored on IPFS.

### 🛍️ User Deal Feed  
Displays all active deals with claim buttons.  
Each “Claim NFT” simulates the minting process for now.

### 🎫 Redeem Page  
Merchants can enter or scan a coupon ID to verify and mark it as redeemed.  
Simulated on-chain redemption flow ensures single-use coupons.

### 💬 Simulated Web3 Flow  
- “Claim NFT” → Mock mint success alert.  
- “Redeem” → Mock verification flow.  
- Ready for Solana + Anchor contract integration.

---

## 🧩 Architecture  

Next.js + Tailwind (Frontend)
├── / → User Deal Feed
├── /merchant → Merchant Dashboard (create deals)
├── /redeem → Redeem flow (verify & redeem)


---

## ⚙️ Tech Stack  

| Layer | Tools Used |
|--------|-------------|
| **Frontend** | Next.js 14 + Tailwind CSS |
| **Smart Contract (planned)** | Solana + Anchor |
| **Storage (planned)** | IPFS / Arweave for metadata |
| **Hosting** | Vercel |
| **Wallet Integration (planned)** | Phantom / Web3Auth |

---

## 🧪 Flow  

1. **Merchant creates deal** → (Would mint NFT metadata)  
2. **User claims deal** → NFT claim simulated  
3. **Merchant redeems** → Coupon ID verified and marked redeemed  

This completes the entire lifecycle of NFT coupons — create → own → redeem.

---

## 🧱 Judging Criteria Coverage  

| Criteria | How Dealify Addresses It |
|-----------|--------------------------|
| **Innovation & Creativity** | Introduces NFT coupons — making discounts tradable, verifiable, and liquid. |
| **Technical Implementation** | Built with Next.js architecture, modular React components, and Web3-ready simulation flow. |
| **User Experience (UX)** | Minimalist and intuitive dark-mode UI that abstracts Web3 complexity. |
| **Feasibility & Scalability** | Merchant dashboard + user discovery system shows adoption potential for real businesses. |
| **Completeness** | Full flow demonstrated: create → claim → redeem, with simulated on-chain logic. |

---

## 🧱 Web3 Integration Challenges Addressed  

- **Representation:** Each coupon represented as NFT metadata (discount %, expiry, merchant ID).  
- **Redemption Flow:** Simulated verification system to demonstrate secure, single-use redemption.  
- **UX Abstraction:** Simple, Web2-style flows with mock wallet connect (ready for Web3 plug-in).  
- **Merchant Onboarding:** Easy form-based dashboard for minting coupons.  
- **Liquidity & Resale:** Coupons are designed to be transferable in future versions.

---

## 📈 Future Roadmap  

1. **On-Chain Minting:**  
   Integrate Solana + Metaplex NFT metadata standard.  
2. **IPFS Storage:**  
   Upload deal metadata to IPFS/Arweave for permanence.  
3. **Real Redemption Attestation:**  
   Anchor program to verify coupon ownership and mark as redeemed.  
4. **Deal Aggregation:**  
   Integrate external APIs (Shopify, Booking.com, etc.)  
5. **Loyalty & Rewards:**  
   Add on-chain staking or reputation-based rewards for active users.

---

## 📦 Installation & Local Setup  

```bash
# Clone the repo
git clone https://github.com/Amit5601/NFT-deal.git

# Navigate into folder
cd NFT-deal

# Install dependencies
npm install

# Run locally
npm run dev

# Open in browser
http://localhost:3000
