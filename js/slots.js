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

function spinSlot() {
  const symbols = ["🍉", "🍋", "🍒", "⭐", "💎", "7️⃣"];
  const slotCells = document.querySelectorAll(".slot-cell");
  let result = [];

  for (let i = 0; i < slotCells.length; i++) {
    const randSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    slotCells[i].textContent = randSymbol;
    result.push(randSymbol);
  }

  let winnings = 0;
  if (result.every(sym => sym === result[0])) {
    winnings = 500;
    confetti();
    document.getElementById("slot-result").textContent = "🎉 JACKPOT! Alle symbolen zijn gelijk!";
  } else if (result[0] === result[1] || result[1] === result[2] || result[2] === result[3] || result[3] === result[4]) {
    winnings = 100;
    document.getElementById("slot-result").textContent = "✅ Je hebt een winnende combinatie!";
  } else {
    document.getElementById("slot-result").textContent = "❌ Geen winst. Probeer opnieuw!";
  }

  memeBalance += winnings;
  document.getElementById("last-win").textContent = `💸 Winst deze ronde: ${winnings} $MEME`;
  document.getElementById("live-balance").textContent = `💰 Huidige $MEME balans: ${memeBalance}`;
}
