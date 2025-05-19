// js/mint.js
import { state } from './state.js';
import { CONFIG } from './config.js';
import { updateBalanceDisplay } from './ui.js';


export function mintTokens() {
  if (window.solana && window.solana.isPhantom) {
    window.solana.connect()
      .then(res => {
        state.memeBalance += CONFIG.TOKEN_INCREMENT;
        confetti();  // Zorg dat canvas-confetti geladen is
        document.getElementById("mint-message").textContent = 
          `✅ ${CONFIG.TOKEN_INCREMENT} ${CONFIG.TOKEN_NAME} tokens toegevoegd aan je wallet!`;
        updateBalanceDisplay();
      })
      .catch(err => {
        document.getElementById("mint-message").textContent = 
          "❌ Verbinden mislukt: " + err.message;
      });
  } else {
    document.getElementById("mint-message").textContent = 
      "⚠️ Phantom Wallet niet gevonden.";
  }
}
