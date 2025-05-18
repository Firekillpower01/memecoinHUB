// js/airdrop.js

import { CONFIG } from './config.js';
import { state } from './state.js';
import { updateBalanceDisplay, showTemporaryAlert } from './ui.js';

export function claimAirdrop() {
  if (state.memeBalance >= CONFIG.AIRDROP_LIMIT) {
    showTemporaryAlert("🚫 Je hebt al genoeg tokens om niet in aanmerking te komen voor de airdrop.");
    return;
  }

  state.memeBalance += CONFIG.AIRDROP_AMOUNT;
  updateBalanceDisplay();
  showTemporaryAlert(`🎁 Je hebt ${CONFIG.AIRDROP_AMOUNT} ${CONFIG.TOKEN_NAME} ontvangen!`);
}
