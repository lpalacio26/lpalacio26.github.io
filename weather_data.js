 // Modified weather handling with permission flow
 async function getWeatherData() {
    const weatherElement = document.getElementById("weather");
    const cached = dataCache.getWeather();

    try {
      // First try cached data
      if (cached) {
        weatherElement.textContent = `${cached}°C (cached)`;
        weatherElement.style.cursor = "pointer";
        weatherElement.title = "Click to refresh weather data";
      }

      // Request fresh data
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 600000, // 10 minute cache
        });
      });

      const weatherRes = await fetch(
        `${WEATHER_PROXY}forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current_weather=true`
      );

      const weatherData = await weatherRes.json();
      const temp = weatherData.current_weather.temperature;
      weatherElement.textContent = `${temp}°C`;
      dataCache.setWeather(temp);
    } catch (error) {
      console.error("Weather error:", error);
      if (!cached) {
        weatherElement.innerHTML =
          '<span class="error-glitch">LOCATION REQUIRED</span>';
        weatherElement.style.cursor = "pointer";
        weatherElement.title = "Click to enable location access";
      }
    }
  }

  // Add click handler for weather element
  document.getElementById("weather").addEventListener("click", async () => {
    const status = document.getElementById("formStatus");
    status.textContent = "> Requesting location permissions...";

    try {
      await getWeatherData();
    } catch (error) {
      status.textContent = "> Enable location in browser settings";
      setTimeout(() => (status.textContent = ""), 3000);
    }
  });