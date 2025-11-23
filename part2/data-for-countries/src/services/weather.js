import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const getWeatherData = (capital) => {
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;
  return axios.get(weatherApiUrl).then(response => response.data);
}

export default { getWeatherData };