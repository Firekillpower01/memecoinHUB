// js/slots.js

import { CONFIG } from './config.js';
import { state, setUserWallet } from './state.js';
import { updateBalanceDisplay } from './ui.js';

// 🎛️ Slotmachine Configuratie
const symbols = ['🍒', '🍋', '🍉', '🔔', '⭐', '💎', '7️⃣'];
const spinDuration = 600; // in milliseconden

// 🎯 DOM-elementen
const reels = document.querySelectorAll('.reel');
const spinButton = document.getElementById('spin-button');
const slotMessage = document.getElementById('slot-message');

// 🧠 Hulpfunctie om een willekeurig symbool te selecteren
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// 🎰 Functie om de slotmachine te laten draaien
function spinReels() {
  // Voeg animatieklasse toe aan elke reel
  reels.forEach(reel => {
    reel.classList.add('spin');
  });

  // Na de animatie, update de symbolen
  setTimeout(() => {
    reels.forEach(reel => {
      reel.textContent = getRandomSymbol();
      reel.classList.remove('spin');
    });

    // Controleer op winnende combinatie
    checkWin();
  }, spinDuration);
}

// 🏆 Functie om te controleren op een winnende combinatie
function checkWin() {
  const [symbol1, symbol2, symbol3] = Array.from(reels).map(reel => reel.textContent);

  if (symbol1 === symbol2 && symbol2 === symbol3) {
    slotMessage.textContent = `🎉 Gewonnen! Drie ${symbol1} in een rij!`;
    slotMessage.style.color = '#00ffd5';
    // Voeg hier logica toe voor beloningen of updates
  } else {
    slotMessage.textContent = '❌ Geen winst, probeer het opnieuw!';
    slotMessage.style.color = '#ff4d4d';
  }
}

// 🎮 Eventlistener voor de spin-knop
spinButton.addEventListener('click', () => {
  slotMessage.textContent = '';
  spinReels();
});

// 🧪 Initialisatie (optioneel)
document.addEventListener('DOMContentLoaded', () => {
  // Stel initiële symbolen in
  reels.forEach(reel => {
    reel.textContent = getRandomSymbol();
  });
});
