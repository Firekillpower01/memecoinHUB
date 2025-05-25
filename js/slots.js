// js/slots.js

// 🎰 Slot Configuratie
const symbols = ['🍒', '🍋', '🍉', '🔔', '⭐', '💎', '7️⃣', '🃏']; // 🃏 = Wild
const rows = 3;
const cols = 5;
const spinDuration = 800;

let currentBet = 1;
let reels = []; // wordt pas gevuld na DOM geladen

// 🧠 Willekeurig symbool
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// 🌟 Highlight winnende symbolen
function highlightWinningSymbols(indices) {
  indices.forEach(index => {
    reels[index].classList.add('win-glow');
  });
}

// ❌ Reset highlight
function resetHighlights() {
  reels.forEach(reel => reel.classList.remove('win-glow'));
}

// 🎰 Spin-functie
function spinReels() {
  resetHighlights();
  spinButton.disabled = true;

  reels.forEach(reel => {
    reel.classList.add('spin');
  });

  setTimeout(() => {
    reels.forEach(reel => {
      reel.textContent = getRandomSymbol();
      reel.classList.remove('spin');
    });

    checkWin();
    spinButton.disabled = false;
  }, spinDuration);
}

// 🏆 Wincontrole
function checkWin() {
  let hasWin = false;
  let winAmount = 0;
  const grid = Array.from(reels).map(reel => reel.textContent);

  for (let r = 0; r < rows; r++) {
    const rowSymbols = [];
    for (let c = 0; c < cols; c++) {
      rowSymbols.push(grid[r * cols + c]);
    }

    const first = rowSymbols[0];
    const isWild = (s) => s === '🃏';
    const allSame = rowSymbols.every(s => s === first || isWild(s) || isWild(first));

    if (allSame) {
      hasWin = true;
      winAmount += currentBet * 10;
      const indices = Array.from({ length: cols }, (_, i) => r * cols + i);
      highlightWinningSymbols(indices);
    }
  }

  if (hasWin) {
    slotMessage.textContent = `🎉 Je wint ${winAmount} credits!`;
    slotMessage.style.color = '#00ffd5';
  } else {
    slotMessage.textContent = '❌ Geen winst, probeer opnieuw!';
    slotMessage.style.color = '#ff4d4d';
  }

  logSpin(grid, currentBet, winAmount);
}

// 💸 Inzet aanpassen
export function changeBet(amount) {
  currentBet = Math.max(1, currentBet + amount);
  if (betDisplay) betDisplay.textContent = currentBet;
}

// 📜 Log spin naar localStorage
function logSpin(result, bet, winAmount) {
  const history = JSON.parse(localStorage.getItem('spinhistory')) || [];
  const entry = {
    time: new Date().toLocaleString(),
    result: result.join(''),
    bet: bet,
    win: winAmount
  };
  history.unshift(entry);
  localStorage.setItem('spinhistory', JSON.stringify(history));
}

// 📜 Toon geschiedenis in UI
function renderSpinHistory() {
  const history = JSON.parse(localStorage.getItem('spinhistory')) || [];
  const container = document.getElementById('spin-history');
  container.innerHTML = '';

  if (history.length === 0) {
    container.innerHTML = '<div>Geen spins opgeslagen.</div>';
    return;
  }

  history.forEach(entry => {
    const div = document.createElement('div');
    div.innerHTML = `⏰ ${entry.time} | 🎰 ${entry.result} | 🪙 Inzet: ${entry.bet} | 💰 Winst: ${entry.win}`;
    container.appendChild(div);
  });
}

// 📜 Geschiedenisknoppen
document.getElementById('toggle-history-btn').addEventListener('click', () => {
  const container = document.getElementById('spin-history');
  container.classList.toggle('hidden');
  renderSpinHistory();
});

document.getElementById('reset-history-btn').addEventListener('click', () => {
  if (confirm('Weet je zeker dat je de spin-geschiedenis wilt wissen?')) {
    localStorage.removeItem('spinhistory');
    renderSpinHistory();
  }
});

// 🎮 Start bij DOM-load
document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('reels-grid');
  const totalCells = rows * cols;

  // Genereer grid dynamisch
  for (let i = 0; i < totalCells; i++) {
    const div = document.createElement('div');
    div.classList.add('reel');
    div.textContent = getRandomSymbol();
    gridContainer.appendChild(div);
  }

  reels = document.querySelectorAll('.reel');

  if (reels.length !== totalCells) {
    console.warn(`⚠️ Verwacht ${totalCells} reels, maar kreeg er ${reels.length}`);
  }

  if (betDisplay) betDisplay.textContent = currentBet;

  spinButton.addEventListener('click', () => {
    slotMessage.textContent = '';
    spinReels();
  });
});

// 🎯 DOM-elementen (pas op na DOM-load gebruiken)
const spinButton = document.getElementById('spin-button');
const slotMessage = document.getElementById('slot-message');
const betDisplay = document.getElementById('bet-amount');
