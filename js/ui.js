// js/ui.js

import { state } from './state.js';

// Werk de zichtbare tokenbalans bij op de pagina
export function updateBalanceDisplay() {
  const balanceEl = document.getElementById("live-balance");
  if (balanceEl) {
    if (typeof state.memeBalance === 'number') {
      balanceEl.textContent = `💰 Huidige $MEME balans: ${state.memeBalance}`;
    } else {
      balanceEl.textContent = "⚠️ Ongeldige balanswaarde";
    }
  }
}

// Toon een melding in het mint-gedeelte
export function showMintMessage(message) {
  const el = document.getElementById("mint-message");
  if (el) el.textContent = message;
}

// (optioneel) Toon tijdelijke notificatie bovenin of ergens op de UI
export function showTemporaryAlert(message, duration = 3000) {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #00ffd5;
    color: #000;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 9999;
    font-weight: bold;
  `;
  document.body.appendChild(alertBox);
  setTimeout(() => alertBox.remove(), duration);
}
