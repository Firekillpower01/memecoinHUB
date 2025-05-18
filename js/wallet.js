// js/wallet.js

import { state } from './state.js';
import { updateBalanceDisplay } from './ui.js';

export async function connectPhantom() {
  if (window.solana && window.solana.isPhantom) {
    try {
      const res = await window.solana.connect();
      state.userWallet = res.publicKey.toString();
      document.getElementById("wallet-info").textContent = `✅ Verbonden wallet: ${state.userWallet}`;
      updateBalanceDisplay();
    } catch (err) {
      alert("❌ Verbinden mislukt: " + err.message);
    }
  } else {
    alert("⚠️ Phantom Wallet niet gevonden.");
  }
}
