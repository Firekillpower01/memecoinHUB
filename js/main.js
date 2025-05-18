// js/main.js

let memeBalance = 0;

function connectPhantom() {
  if (window.solana && window.solana.isPhantom) {
    window.solana.connect().then(res => {
      const pubKey = res.publicKey.toString();
      document.getElementById("wallet-info").textContent = `✅ Verbonden wallet: ${pubKey}`;
      document.getElementById("live-balance").textContent = `💰 Huidige $MEME balans: ${memeBalance}`;
    }).catch(err => {
      alert("❌ Verbinden mislukt: " + err.message);
    });
  } else {
    alert("⚠️ Phantom Wallet niet gevonden.");
  }
}

function updateBalanceDisplay() {
  const balanceEl = document.getElementById("live-balance");
  if (balanceEl) {
    balanceEl.textContent = `💰 Huidige $MEME balans: ${memeBalance}`;
  }
}

