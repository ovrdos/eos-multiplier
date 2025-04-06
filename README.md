# EOS Airdrop Multiplier

## 📌 Purpose

This project allows you to interact with the EOS Airdrop Multiplier, designed to potentially increase your EOS balance by sending EOS to your own destination tag. The script handles authenticated requests to Coinbase using API keys.

---

## 📖 Overview

By following the steps below, you can automate EOS transfers with the proper memo (destination tag) to trigger the multiplier effect. Example behavior:

```
node sendeos.js
-> Sent: 1.0000 EOS
-> Received: 2.0200 EOS
```

---

## ❓ Frequently Asked Questions

### How does it work?
The EOS wallet is currently running an airdrop to promote network activity and liquidity. Sending EOS to your account's unique destination tag (memo) results in the EOS being returned in a multiplied amount.

### What is my destination tag?
Log into your Coinbase EOS wallet. Click **Receive** to view your memo. This memo acts as your destination tag.

### Why would EOS do this?
To incentivize usage and increase on-chain volume and liquidity in the EOS ecosystem.

---

## 🛠 Step-by-Step Instructions

1. **Create a Coinbase Account**  
   [Create one here](https://www.coinbase.com)

2. **Buy EOS**  
   Deposit funds or convert BTC into EOS.

3. **Locate Your EOS Memo (Destination Tag)**  
   - Go to **EOS Wallet → Receive**  
   - Copy the **memo** shown (this is your destination tag)

4. **Install Node.js & npm**  
   Ensure both are installed on your machine.

5. **Clone the Repo and Install Dependencies**
   ```bash
   git clone https://github.com/your-username/eos-multiplier.git
   cd eos-multiplier
   npm install
   ```

6. **Generate API Credentials**  
   Follow the Coinbase API setup guide:  
   [Coinbase API Docs](https://docs.cdp.coinbase.com/coinbase-app/docs/getting-started#creating-api-keys)

7. **Create a `.env` File**
   Add the following keys:
   ```env
   KEY_NAME=organizations/[org_id]/apiKeys/[key_id]
   KEY_SECRET="-----BEGIN EC PRIVATE KEY-----\n[private_key_contents]\n-----END EC PRIVATE KEY-----"
   DESTINATION_TAG=your_eos_memo_tag
   ```
   Checkout sample.env for the proper format.

8. **Run the Script Once**
   ```bash
   node sendeos.js
   ```

9. **Run Multiple Times via Bash Script**
   ```bash
   ./runsendeos.sh
   ```

---

## 💡 Tips

- Wait ~10 minutes after sending to see the returned balance.
- Use a small test amount first to confirm everything is working correctly.
- Be sure your EOS wallet and memo are correctly configured.

---

## ⚠️ Disclaimer

Use at your own risk. This tool interacts with financial APIs and relies on third-party behavior that may change. Always test with small amounts first.

---

## 📬 Questions?

Feel free to open an issue or reach out via GitHub.
