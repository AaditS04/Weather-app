const form = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherResult = document.getElementById('weatherResult');
const locationElem = document.getElementById('location');
const temperatureElem = document.getElementById('temperature');
const conditionElem = document.getElementById('condition');
const emojiElem = document.getElementById('emoji');

// Function to map condition to emoji
function getWeatherEmoji(condition) {
  condition = condition.toLowerCase();
  if (condition.includes('sunny')) return '☀️';
  if (condition.includes('cloud')) return '☁️';
  if (condition.includes('rain')) return '🌧️';
  if (condition.includes('thunder')) return '⛈️';
  if (condition.includes('snow')) return '❄️';
  if (condition.includes('fog') || condition.includes('mist')) return '🌫️';
  return '🌤️'; // default
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (!location) return;

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=f78d1f86dae1482fa74112128250807&q=${encodeURIComponent(location)}&aqi=no`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error("Weather not found");
    const data = await res.json();

    const city = `${data.location.name}, ${data.location.country}`;
    const temp = `${data.current.temp_c}°C`;
    const condition = data.current.condition.text;
    const emoji = getWeatherEmoji(condition);

    locationElem.textContent = city;
    temperatureElem.textContent = `Temperature: ${temp}`;
    conditionElem.textContent = `Condition: ${condition}`;
    emojiElem.textContent = emoji;

    weatherResult.classList.remove('hidden');
  } catch (err) {
    alert("Error fetching weather. Please check location.");
    console.error(err);
  }
});

