// js/state.js

export let memeBalance = 0;

export function setMemeBalance(amount) {
  memeBalance = amount;
}

export function addToMemeBalance(amount) {
  memeBalance += amount;
}

export function getMemeBalance() {
  return memeBalance;
}
