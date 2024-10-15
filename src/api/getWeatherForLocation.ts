import { WeatherData } from '../components/WeatherCard/Types/types';

export async function getWeatherForLocation(lng: number, lat: number): Promise<WeatherData> {
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('REACT_APP_OPEN_WEATHER_API_KEY is not set');
  }

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,alerts&appid=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();


    const weatherObject: WeatherData = {
      temp: data.current.temp,
      feels_like: data.current.feels_like,
      temp_min: data.daily[0].temp.min,
      temp_max: data.daily[0].temp.max,
      sunrise: data.current.sunrise,
      sunset: data.current.sunset,
      humidity: data.current.humidity,
      wind_speed: data.current.wind_speed,
      wind_deg: data.current.wind_deg,
      visibility: data.current.visibility,
      description: data.current.weather[0].description,
      main: data.current.weather[0].main,
      icon: data.current.weather[0].icon,
      daily: data.daily,
    };

    return weatherObject;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
