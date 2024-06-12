const apiKey = "0a53abac878d47ee99a102134241206";
const baseURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;

async function fetchWeather(url) {
    const response = await fetch(url);
    const weather = await response.json();
    return weather;
}

let searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async () => {
  let searchCity = document.getElementById("city-name");
  if (searchCity.value) {
    searchCity.value =
      searchCity.value.charAt(0).toUpperCase() + searchCity.value.slice(1);
  }
  let url = `${baseURL}${searchCity.value}`;

  let weather = await fetchWeather(url);

  let weatherIcon = document.getElementsByClassName("weather-icon")[0];

  let weatherType = weather.current.condition.text.toLowerCase();

  const availableWeatherTypes = ['light drizzle', 'mist', 'partly cloudy', 'rain', 'snow', 'sunny'];

  if(!availableWeatherTypes.includes(weatherType)){
    weatherType = 'sunny';
  }

  weatherIcon.setAttribute("src", `./images/${weatherType}.png`);


  let temperature = document.getElementsByClassName("temp")[0];
  let feelsLikeWeather = document.getElementById("feels-like");
  let cityName = document.getElementsByClassName("city")[0];
  let humidity = document.getElementsByClassName("humidity")[0];
  let windSpeed = document.getElementsByClassName("wind")[0];

  temperature.innerHTML =  weather.current.temp_c + "°C";
  cityName.innerHTML = searchCity.value;
  feelsLikeWeather.innerHTML = "Feels like " + weather.current.feelslike_c + "°C";
  humidity.innerHTML = weather.current.humidity + "%";
  windSpeed.innerHTML = weather.current.wind_kph + " kmph";
  
});
