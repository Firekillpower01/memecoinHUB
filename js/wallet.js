// js/wallet.js

import { state, setUserWallet } from './state.js';
import { updateBalanceDisplay, showTemporaryAlert } from './ui.js';

// 🚀 Phantom Wallet connectie
export async function connectPhantom() {
  if (window.solana && window.solana.isPhantom) {
    try {
      const res = await window.solana.connect();
      const walletAddress = res.publicKey.toString();

      // 🔐 Wallet opslaan in state
      setUserWallet(walletAddress);

      // 🔎 Toon verbonden wallet in UI
      document.getElementById("wallet-info").textContent = `✅ Verbonden wallet: ${walletAddress}`;
      
      // 🔁 Update balans
      updateBalanceDisplay();

      // 💬 Stijlvolle melding
      showTemporaryAlert(`✅ Verbonden met ${walletAddress.slice(0, 6)}...`);

    } catch (err) {
      // ❌ Fout bij verbinden
      showTemporaryAlert(`❌ Verbinden mislukt: ${err.message}`);
    }

  } else {
    // ⚠️ Geen Phantom Wallet
    showTemporaryAlert("⚠️ Phantom Wallet niet gevonden.");
  }
}
