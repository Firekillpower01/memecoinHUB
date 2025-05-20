// js/airdrop.js

import { state } from './state.js';
import { updateBalanceDisplay } from './ui.js';

export function claimAirdrop() {
  if (!state.userWallet) {
    document.getElementById("airdrop-message").textContent = "❌ Geen wallet verbonden.";
    return;
  }

  const amount = Math.floor(Math.random() * 10) + 1;
  state.memeBalance += amount;

  const message = `🎉 ${amount} $MEME geclaimd!`;
  document.getElementById("airdrop-message").textContent = message;

  confetti();
  glowEffect(document.getElementById("airdrop-message"));
  logAirdrop(state.userWallet, amount);
  updateBalanceDisplay();
  showAirdropLogsAndLeaderboard();
}

function glowEffect(element) {
  element.classList.remove("glow");
  void element.offsetWidth; // trigger reflow
  element.classList.add("glow");
}

export function logAirdrop(wallet, amount) {
  const logEntry = {
    wallet,
    amount,
    timestamp: new Date().toISOString()
  };

  let logs = JSON.parse(localStorage.getItem("airdropLogs") || "[]");
  logs.unshift(logEntry);
  logs = logs.slice(0, 25); // max 25 logs
  localStorage.setItem("airdropLogs", JSON.stringify(logs));
}

export function showAirdropLogs() {
  const container = document.getElementById("airdrop-logs");
  if (!container) return;

  const logs = JSON.parse(localStorage.getItem("airdropLogs") || "[]");
  container.innerHTML = "<h3>📜 Recente Airdrops</h3>";

  const logHTML = logs.map(entry => {
    const shortWallet = entry.wallet.slice(0, 4) + "..." + entry.wallet.slice(-4);
    const time = new Date(entry.timestamp).toLocaleTimeString();
    return `
      <div class="log-entry glitch">
        <span class="log-wallet">${shortWallet}</span> claimde 
        <span class="log-amount">${entry.amount} $MEME</span> om <span class="log-time">${time}</span>
      </div>
    `;
  }).join("");

  container.innerHTML += logHTML;
}

export function showLeaderboard() {
  const container = document.getElementById("airdrop-leaderboard");
  if (!container) return;

  const logs = JSON.parse(localStorage.getItem("airdropLogs") || "[]");
  const totals = {};

  logs.forEach(entry => {
    if (!totals[entry.wallet]) totals[entry.wallet] = 0;
    totals[entry.wallet] += entry.amount;
  });

  const sorted = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  container.innerHTML = "<h3>🏆 Leaderboard</h3>";

  const leaderboardHTML = sorted.map(([wallet, total], index) => {
    const shortWallet = wallet.slice(0, 4) + "..." + wallet.slice(-4);
    return `
      <div class="leaderboard-entry glitch">
        <span class="rank">#${index + 1}</span>
        <span class="wallet">${shortWallet}</span>
        <span class="score">${total} $MEME</span>
      </div>
    `;
  }).join("");

  container.innerHTML += leaderboardHTML;
}

export function showAirdropLogsAndLeaderboard() {
  showAirdropLogs();
  showLeaderboard();
}
