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

  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });

  logAirdrop(state.userWallet, CONFIG.AIRDROP_AMOUNT);
  showAirdropLogsAndLeaderboard();
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

  logDiv.innerHTML = `<h3>📜 Airdrop Log</h3>`;
  logs.slice().reverse().forEach((log, i) => {
    const entry = document.createElement("div");
    entry.className = "log-entry terminal-line";

    if (i === 0) {
      entry.classList.add("glow");
      setTimeout(() => entry.classList.remove("glow"), 2500);
    }

    entry.innerHTML = `
      <span class="terminal-prefix">$</span> 
      <span class="wallet">${log.wallet.slice(0, 6)}...</span>
      <span class="amount">${log.amount} ${CONFIG.TOKEN_NAME}</span>
      <span class="timestamp">${new Date(log.timestamp).toLocaleString()}</span>
    `;
    logDiv.appendChild(entry);
  });
}

// --- LEADERBOARD TONEN ---
function showLeaderboard() {
  const logs = JSON.parse(localStorage.getItem('airdropLogs') || '[]');
  const leaderboardDiv = document.getElementById("airdrop-leaderboard");
  if (!leaderboardDiv) return;

  const totals = {};
  logs.forEach(log => {
    totals[log.wallet] = (totals[log.wallet] || 0) + log.amount;
  });

  const sorted = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const newIndex = sorted.findIndex(([wallet]) => wallet === state.userWallet);
  const previousIndex = parseInt(localStorage.getItem('leaderboardPosition') ?? "-1");
  localStorage.setItem('leaderboardPosition', newIndex);

  leaderboardDiv.innerHTML = "<h3>🏆 Leaderboard</h3>";
  sorted.forEach(([wallet, amount], i) => {
    const entry = document.createElement("div");
    entry.className = "leaderboard-entry";

    if (wallet === state.userWallet && newIndex !== previousIndex) {
      entry.classList.add("glow");
      setTimeout(() => entry.classList.remove("glow"), 2500);
    }

    entry.innerHTML = `
      <span class="rank">#${i + 1}</span> 
      <span class="wallet">${wallet.slice(0, 6)}...</span> 
      <span class="amount">${amount} ${CONFIG.TOKEN_NAME}</span>
    `;
    leaderboardDiv.appendChild(entry);
  });
}

// --- COMBINATIE ---
export function showAirdropLogsAndLeaderboard() {
  showAirdropLogs();
  showLeaderboard();
}
