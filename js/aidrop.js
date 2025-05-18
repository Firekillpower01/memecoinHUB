// js/airdrop.js

import { state } from './state.js';
import { config } from './config.js';
import { updateBalanceDisplay, showTemporaryAlert } from './ui.js';

export function claimAirdrop() {
  if (!state.userWallet) {
    showTemporaryAlert("⚠️ Verbind eerst je Phantom wallet.");
    return;
  }

  // Simuleer het ontvangen van tokens via een airdrop
  state.memeBalance += config.airdropAmount;

  showTemporaryAlert(`🎁 Je hebt ${config.airdropAmount} $MEME tokens ontvangen!`);
  updateBalanceDisplay();
}
