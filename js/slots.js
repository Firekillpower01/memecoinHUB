// js/slots.js

import { state } from './state.js';
import { config } from './config.js';
import { updateBalanceDisplay, showTemporaryAlert } from './ui.js';

const symbols = ["🍒", "🍋", "🔔", "⭐", "💎", "7️⃣", "🍀"];
let isSpinning = false;

export function spinSlots() {
  if (isSpinning) return;
  if (state.memeBalance < config.spinCost) {
    showTemporaryAlert("❌ Niet genoeg $MEME tokens om te spinnen.");
    return;
  }

  isSpinning = true;
  state.memeBalance -= config.spinCost;
  updateBalanceDisplay();

  const reels = [
    getRandomSymbol(),
    getRandomSymbol(),
    getRandomSymbol()
  ];

  updateReelsDisplay(reels);

  const isWin = reels.every(sym => sym === reels[0]);
  if (isWin) {
    const winnings = config.winReward;
    state.memeBalance += winnings;
    showTemporaryAlert(`🎉 Gewonnen! ${winnings} $MEME tokens!`);
  } else {
    showTemporaryAlert("😢 Geen winst, probeer opnieuw.");
  }

  updateBalanceDisplay();
  isSpinning = false;
}

function getRandomSymbol() {
  const index = Math.floor(Math.random() * symbols.length);
  return symbols[index];
}

function updateReelsDisplay(reels) {
  for (let i = 0; i < reels.length; i++) {
    const reel = document.getElementById(`reel-${i}`);
    if (reel) reel.textContent = reels[i];
  }
}
