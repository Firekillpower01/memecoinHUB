// js/main.js

// Overweeg om deze variabele in een gedeeld config- of state-bestand te zetten als meerdere scripts ermee werken,
// zodat je synchronisatieproblemen voorkomt.
let memeBalance = 0;

function connectPhantom() {
  if (window.solana && window.solana.isPhantom) {
    window.solana.connect().then(res => {
      const pubKey = res.publicKey.toString();
      document.getElementById("wallet-info").textContent = `✅ Verbonden wallet: ${pubKey}`;
      updateBalanceDisplay();
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
    if (typeof memeBalance === 'number') {
      balanceEl.textContent = `💰 Huidige $MEME balans: ${memeBalance}`;
    } else {
      balanceEl.textContent = "⚠️ Ongeldige balanswaarde";
    }
  }
}
