async function getWeather() {
    const resultDiv = document.getElementById("weatherResult");
    const citySelect = document.getElementById("citySelect");

    const coords = citySelect.value.split(",");
    const lat = coords[0];
    const lon = coords[1];
    const cityName = citySelect.options[citySelect.selectedIndex].text;

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    resultDiv.innerHTML = "<p><i>Fetching live weather data...</i></p>";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();

        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;

        resultDiv.innerHTML = `
                    <h3>${cityName}</h3>
                    <p><b>Temperature:</b> ${temp} °C</p>
                    <p><b>Wind Speed:</b> ${wind} km/h</p>
                `;
    } catch (error) {
        console.error("Fetch Error:", error);
        resultDiv.innerHTML = `<p style="color:red;">Failed to retrieve weather data.</p>`;
    }
}
