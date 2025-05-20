// js/mint.js

import { state } from './state.js';
import { CONFIG } from './config.js';
import { updateBalanceDisplay, showTemporaryAlert } from './ui.js';

// 🚀 Token Mint Functie
export function mintTokens() {
  if (window.solana && window.solana.isPhantom) {
    window.solana.connect()
      .then(res => {
        // Voeg tokens toe aan oefensaldo
        state.memeBalance += CONFIG.TOKEN_INCREMENT;

        // 🎉 Confetti animatie
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00ffd5', '#00bfae', '#00ffae']
        });

        // ✅ Toon succesmelding
        const message = `✅ ${CONFIG.TOKEN_INCREMENT} ${CONFIG.TOKEN_NAME} toegevoegd aan je wallet!`;
        document.getElementById("mint-message").textContent = message;

        // 🔁 Update visuele balans
        updateBalanceDisplay();

        // 💬 Optioneel: tijdelijke alert met stijl
        showTemporaryAlert(message);
      })
      .catch(err => {
        // ❌ Mislukt
        document.getElementById("mint-message").textContent =
          `❌ Verbinden mislukt: ${err.message}`;
      });
  } else {
    // ⚠️ Geen Phantom Wallet
    document.getElementById("mint-message").textContent =
      "⚠️ Phantom Wallet niet gevonden.";
  }
}
