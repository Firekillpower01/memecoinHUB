// js/airdrop.js

import { CONFIG } from './config.js';
import { state } from './state.js';
import { updateBalanceDisplay } from './main.js';

// --- AIRDROP CLAIM ---
export function claimAirdrop() {
  if (!state.userWallet) {
    alert("⚠️ Verbind eerst je wallet.");
    return;
  }

  state.memeBalance += CONFIG.AIRDROP_AMOUNT;
  updateBalanceDisplay();

  showTemporaryAlert(`🎉 ${CONFIG.AIRDROP_AMOUNT} ${CONFIG.TOKEN_NAME} geclaimd!`);

  // Confetti animatie
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Log en update visueel
  logAirdrop(state.userWallet, CONFIG.AIRDROP_AMOUNT);
  showAirdropLogsAndLeaderboard(); // Eén duidelijke aanroep
}

// --- LOGGEN VAN AIRDROP ---
function logAirdrop(wallet, amount) {
  const logs = JSON.parse(localStorage.getItem('airdropLogs') || '[]');
  logs.push({
    wallet,
    amount,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('airdropLogs', JSON.stringify(logs));
}

// --- AIRDROP LOGS TONEN ---
function showAirdropLogs() {
  const logs = JSON.parse(localStorage.getItem('airdropLogs') || '[]');
  const logDiv = document.getElementById("airdrop-logs");
  if (!logDiv) return;

  logDiv.innerHTML = "<h3>📜 Airdrop Log</h3>";
  logs.slice().reverse().forEach((log, i) => {
    const entry = document.createElement("div");
    entry.className = "log-entry";
    if (i === 0) entry.classList.add("glow"); // nieuwste entry
    entry.textContent = `${log.wallet.slice(0, 6)}... • ${log.amount} ${CONFIG.TOKEN_NAME} • ${new Date(log.timestamp).toLocaleString()}`;
    logDiv.appendChild(entry);
  });
}

}

// --- TIJDELIJK BERICHT TONEN ---
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

// --- LEADERBOARD TONEN ---
function showLeaderboard() {
  const logs = JSON.parse(localStorage.getItem('airdropLogs') || '[]');
  const leaderboardDiv = document.getElementById("airdrop-leaderboard");
  if (!leaderboardDiv) return;

  // Totaalbedragen per wallet berekenen
  const totals = {};
  logs.forEach(log => {
    totals[log.wallet] = (totals[log.wallet] || 0) + log.amount;
  });

  // Sorteer op hoogste totaalbedrag
  const sorted = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10

  // HTML genereren
  leaderboardDiv.innerHTML = "<h3>🏆 Leaderboard</h3>";
  sorted.forEach(([wallet, amount], i) => {
    const entry = document.createElement("div");
    entry.className = "leaderboard-entry";
    entry.textContent = `#${i + 1} ${wallet.slice(0, 6)}... — ${amount} ${CONFIG.TOKEN_NAME}`;
    leaderboardDiv.appendChild(entry);
  });
}

// --- COMBINATIE: logs + leaderboard ---
export function showAirdropLogsAndLeaderboard() {
  showAirdropLogs();
  showLeaderboard();
}
