// js/mint.js

function mintTokens() {
  if (window.solana && window.solana.isPhantom) {
    window.solana.connect().then(res => {
      memeBalance += 100;
      confetti();
      document.getElementById("mint-message").textContent = `✅ 100 $MEME tokens toegevoegd aan je wallet!`;
      updateBalanceDisplay();
    }).catch(err => {
      document.getElementById("mint-message").textContent = "❌ Verbinden mislukt: " + err.message;
    });
  } else {
    document.getElementById("mint-message").textContent = "⚠️ Phantom Wallet niet gevonden.";
  }
}
