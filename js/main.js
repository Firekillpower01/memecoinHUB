// js/main.js

import { CONFIG } from './config.js';
import { state, setUserWallet } from './state.js';
import { updateBalanceDisplay } from './ui.js';

export function connectPhantom() {
  if (window.solana && window.solana.isPhantom) {
    window.solana.connect().then(res => {
      const pubKey = res.publicKey.toString();
      setUserWallet(pubKey);
      document.getElementById("wallet-info").textContent = `✅ Verbonden wallet: ${pubKey}`;
      updateBalanceDisplay();
    }).catch(err => {
      alert("❌ Verbinden mislukt: " + err.message);
    });
  } else {
    alert("⚠️ Phantom Wallet niet gevonden.");
  }
}
