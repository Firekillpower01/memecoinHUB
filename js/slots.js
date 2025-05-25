// js/slots.js

// 🎰 Slot Configuratie
const symbols = ['🍒', '🍋', '🍉', '🔔', '⭐', '💎', '7️⃣', '🃏']; // 🃏 = Wild
const rows = 3;
const cols = 5;
const spinDuration = 800;

// 🎯 DOM-elementen
const reels = document.querySelectorAll('.reel');
const spinButton = document.getElementById('spin-button');
const slotMessage = document.getElementById('slot-message');
const betDisplay = document.getElementById('bet-amount');

// Inzet
let currentBet = 1;

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
function checkWin() {
  let hasWin = false;
  let winAmount = 0;
  const grid = Array.from(reels).map(reel => reel.textContent);
  const result = grid;

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

  // 👉 Log de spin naar localStorage
  logSpin(result, currentBet, winAmount);
}


// 🏆 Wincontrole
function checkWin() {
  let hasWin = false;
  const grid = Array.from(reels).map(reel => reel.textContent);

  // Controleer per rij op match of wilds
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
      const indices = Array.from({ length: cols }, (_, i) => r * cols + i);
      highlightWinningSymbols(indices);
    }
  }

  if (hasWin) {
    slotMessage.textContent = `🎉 Je wint ${currentBet * 10} credits!`;
    slotMessage.style.color = '#00ffd5';
  } else {
    slotMessage.textContent = '❌ Geen winst, probeer opnieuw!';
    slotMessage.style.color = '#ff4d4d';
  }
}

// 💸 Inzet aanpassen
export function changeBet(amount) {
  currentBet = Math.max(1, currentBet + amount);
  if (betDisplay) betDisplay.textContent = currentBet;
}

// 🎮 Start
document.addEventListener('DOMContentLoaded', () => {
  reels.forEach(reel => {
    reel.textContent = getRandomSymbol();
  });

  if (betDisplay) betDisplay.textContent = currentBet;
  spinButton.addEventListener('click', () => {
    slotMessage.textContent = '';
    spinReels();
  });
});
// 📜 Log spin naar localStorage
function logSpin(result, bet, winAmount) {
  const history = JSON.parse(localStorage.getItem('spinhistory')) || [];
  const entry = {
    time: new Date().toLocaleString(),
    result: result.join(''),
    bet: bet,
    win: winAmount
  };
  history.unshift(entry); // Nieuwste eerst
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

// 📜 Toggle en reset event listeners
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
