// crypto.js
async function fetchBTCPrice() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    if (!response.ok) throw new Error("API failure");
    const data = await response.json();
    document.getElementById(
      "cryptoPrice"
    ).textContent = `$${data.bitcoin.usd.toFixed(2)}`;
  } catch (error) {
    console.error("BTC fetch error:", error);
    document.getElementById("cryptoPrice").innerHTML =
      '<span class="error-glitch">API ERROR</span>';
  }
}

// Initialize and auto-refresh
document.addEventListener("DOMContentLoaded", () => {
  fetchBTCPrice();
  setInterval(fetchBTCPrice, 60000);
});

// Make it globally available for debugging
window.fetchBTCPrice = fetchBTCPrice;
