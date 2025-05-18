// js/slots.js

const symbols = ["🍒", "🍋", "🔔", "⭐", "💎", "🃏"];
let memeBalance = 0;

function spinSlot() {
  const slotGrid = document.getElementById("slot-grid");
  const result = document.getElementById("slot-result");
  const lastWin = document.getElementById("last-win");
  result.textContent = "";
  lastWin.textContent = "";

  const spinResult = [];
  const cells = slotGrid.querySelectorAll(".slot-cell");

  cells.forEach((cell, index) => {
    const randSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    cell.textContent = randSymbol;
    spinResult.push(randSymbol);
  });

  // Check win condition (3+ in a row from the start)
  const first = spinResult[0];
  let matchCount = 1;
  for (let i = 1; i < spinResult.length; i++) {
    if (spinResult[i] === first) {
      matchCount++;
    } else {
      break;
    }
  }

  if (matchCount >= 3) {
    const winAmount = matchCount * 20;
    memeBalance += winAmount;
    result.textContent = `🎉 Gewonnen: ${winAmount} $MEME!`;
    lastWin.textContent = `✨ Symbolen op rij: ${matchCount} x ${first}`;
    confetti();
    updateBalance();
  } else {
    result.textContent = "❌ Geen winst, probeer opnieuw!";
  }
} 

function updateBalance() {
  const balanceEl = document.getElementById("live-balance");
  if (balanceEl) {
    balanceEl.textContent = `💰 Huidige $MEME balans: ${memeBalance}`;
  }
}
