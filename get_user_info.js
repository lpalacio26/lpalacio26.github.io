async function getUserInfo() {
    try {
      // Fetch the user's IP address
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();
      const ip = ipData.ip;

      // Fetch geolocation info based on IP address
      const geoRes = await fetch(`https://ipinfo.io/${ip}/json`);
      const geoData = await geoRes.json();
      const city = geoData.city || "Unknown City";
      const country = geoData.country || "Unknown Country";

      // Get the current date and time
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();

      // Build the log message
      const logMessage = `> ACCESS LOG :: IP ${ip} // ${city}, ${country} // ${dateStr} ${timeStr}<br /><br />`;

      // Display initial log and add cyberspace message
      const typewriter = document.querySelector(".typewriter-text");
      typewriter.innerHTML = logMessage + typewriter.innerHTML;

      // Display cyberspace message after initial log
      setTimeout(() => {
        const cyberspaceMessage =
          "> cyberspace access granted...<br /><br />";
        typewriter.innerHTML = cyberspaceMessage + typewriter.innerHTML;
      }, 2000); // Delay to simulate "boot" before cyberspace message
    } catch (e) {
      console.error("Failed to fetch IP and geolocation data", e);
    }
  }

  getUserInfo();