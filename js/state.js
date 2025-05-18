// js/state.js

// App status & data
export let memeBalance = 0;
export let userWallet = null;

export function setMemeBalance(amount) {
  memeBalance = amount;
}

export function incrementMemeBalance(amount) {
  memeBalance += amount;
}

export function setUserWallet(pubKey) {
  userWallet = pubKey;
}
