// js/airdrop.js

import { CONFIG } from './config.js';
import { state } from './state.js';
import { updateBalanceDisplay } from './main.js';

export function claimAirdrop() {
  state.memeBalance += CONFIG.AIRDROP_AMOUNT;
  updateBalanceDisplay();

  const msg = `🎁 Je hebt ${CONFIG.AIRDROP_AMOUNT} ${CONFIG.TOKEN_NAME} ontvangen!`;
  document.getElementById("airdrop-message").textContent = msg;
}
