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
  animateReels([
    document.getElementById("reel-0"),
    document.getElementById("reel-1"),
    document.getElementById("reel-2")
  ]);

  const isWin = reels.every(sym => sym === reels[0]);

  setTimeout(() => {
    if (isWin) {
      const winnings = config.winReward;
      state.memeBalance += winnings;
      showTemporaryAlert(`🎉 Gewonnen! ${winnings} $MEME tokens!`);
    } else {
      showTemporaryAlert("😢 Geen winst, probeer opnieuw.");
    }

    updateBalanceDisplay();
    isSpinning = false;
  }, 600); // wacht tot animatie voorbij is
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

// Animatie voor draaiende reels
function animateReels(reelElements) {
  reelElements.forEach(reel => {
    if (!reel) return;
    reel.classList.add("spin");

    setTimeout(() => {
      reel.classList.remove("spin");
    }, 600); // duur moet matchen met de CSS animatie
  });
}
