// crypto.js
const BTC_APIS = [
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
  "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
  "https://api.coinbase.com/v2/prices/BTC-USD/spot",
];

async function fetchBTCPrice() {
  const priceElement = document.getElementById("cryptoPrice");

  for (const apiUrl of BTC_APIS) {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      if (!response.ok) continue;

      const data = await response.json();
      const price = data.bitcoin?.usd || data.price || data.data?.amount;
      if (price) {
        priceElement.textContent = `$${parseFloat(price).toFixed(2)}`;
        return;
      }
    } catch (error) {
      console.warn(`Failed ${apiUrl}:`, error);
    }
  }

  priceElement.innerHTML =
    '<span class="error-glitch">CONNECTION FAILED</span>';
  priceElement.title = "Disable ad blockers or try later";
}

// Initialize with retry logic
document.addEventListener("DOMContentLoaded", () => {
  fetchBTCPrice();
  setInterval(fetchBTCPrice, 30000); // 30s intervals
});

// Add manual refresh capability
document.getElementById("cryptoPrice").addEventListener("click", fetchBTCPrice);
