// js/airdrop.js

import { CONFIG } from './config.js';
import { state } from './state.js';
import { updateBalanceDisplay } from './main.js';

export function claimAirdrop() {
  if (!state.userWallet) {
    alert("⚠️ Verbind eerst je wallet.");
    return;
  }

  state.memeBalance += CONFIG.AIRDROP_AMOUNT;
  updateBalanceDisplay();
  showTemporaryAlert(`🎉 ${CONFIG.AIRDROP_AMOUNT} ${CONFIG.TOKEN_NAME} geclaimd!`);
  logAirdrop(state.userWallet, CONFIG.AIRDROP_AMOUNT);
  showAirdropLogs(); // Toon direct
}

function logAirdrop(wallet, amount) {
  const logs = JSON.parse(localStorage.getItem('airdropLogs') || '[]');
  logs.push({
    wallet,
    amount,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('airdropLogs', JSON.stringify(logs));
}

function showAirdropLogs() {
  const logs = JSON.parse(localStorage.getItem('airdropLogs') || '[]');
  const logDiv = document.getElementById("airdrop-logs");
  if (!logDiv) return;

  logDiv.innerHTML = "<h3>📜 Airdrop Log</h3>";
  logs.slice().reverse().forEach(log => {
    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.textContent = `${log.wallet.slice(0, 6)}... • ${log.amount} ${CONFIG.TOKEN_NAME} • ${new Date(log.timestamp).toLocaleString()}`;
    logDiv.appendChild(entry);
  });
}

function showTemporaryAlert(message) {
  const alertBox = document.getElementById("airdrop-message");
  if (!alertBox) return;

  alertBox.textContent = message;
  alertBox.style.opacity = 1;

  setTimeout(() => {
    alertBox.style.opacity = 0;
    alertBox.textContent = "";
  }, 3000);
}
