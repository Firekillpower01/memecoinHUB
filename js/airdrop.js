// js/airdrop.js

import { CONFIG } from './config.js';
import { state } from './state.js';
import { updateBalanceDisplay, showTemporaryAlert } from './ui.js';

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
    if (i === 0) {
  entry.classList.add("glow");
  setTimeout(() => entry.classList.remove("glow"), 2500); // verwijder glow na 2.5s
}
 // nieuwste entry
    entry.textContent = `${log.wallet.slice(0, 6)}... • ${log.amount} ${CONFIG.TOKEN_NAME} • ${new Date(log.timestamp).toLocaleString()}`;
    logDiv.appendChild(entry);
  });
}


// --- LEADERBOARD TONEN ---
function showLeaderboard() {
  const logs = JSON.parse(localStorage.getItem('airdropLogs') || '[]');
  const leaderboardDiv = document.getElementById("airdrop-leaderboard");
  if (!leaderboardDiv) return;

  // Bereken totaal per wallet
  const totals = {};
  logs.forEach(log => {
    if (!totals[log.wallet]) totals[log.wallet] = 0;
    totals[log.wallet] += log.amount;
  });

  // Sorteer en pak top 10
  const sorted = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Bepaal nieuwe positie van huidige gebruiker
  const newIndex = sorted.findIndex(([wallet]) => wallet === state.userWallet);

  // Vergelijk met vorige opgeslagen positie
  const previousIndex = parseInt(localStorage.getItem('leaderboardPosition') ?? "-1");

  // Update opgeslagen positie
  localStorage.setItem('leaderboardPosition', newIndex);

  leaderboardDiv.innerHTML = "<h3>🏆 Leaderboard</h3>";
  sorted.forEach(([wallet, amount], i) => {
    const entry = document.createElement("div");
    entry.className = "leaderboard-entry";

    if (wallet === state.userWallet) {
      if (newIndex !== previousIndex) {
        entry.classList.add("glow");
        setTimeout(() => entry.classList.remove("glow"), 2500);
      }
    }

    entry.textContent = `#${i + 1} ${wallet.slice(0, 6)}... — ${amount} ${CONFIG.TOKEN_NAME}`;
    leaderboardDiv.appendChild(entry);
  });
}


// --- COMBINATIE: logs + leaderboard ---
export function showAirdropLogsAndLeaderboard() {
  showAirdropLogs();
  showLeaderboard();
}
