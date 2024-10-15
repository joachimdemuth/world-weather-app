import { render, screen } from "@testing-library/react";
import WeatherCard from "../components/WeatherCard/WeatherCard";

describe("WeatherCard and UnitSwitcher", () => {
  it("displays the weather data correctly", () => {
    const mockData = {
      temp: 300,
      feels_like: 299,
      temp_min: 298 ,
      temp_max: 301,
      sunrise: 1728970844,
      sunset: 1729008588,
      humidity: 69,
      wind_speed: 10,
      wind_deg: 20,
      visibility: 10000,
      description: "sunny",
      main: "sun",
      icon: "sun.png",
      daily: [],
    };

    render(
        <WeatherCard data={mockData} city="London" isLoading={false} />
  
    );

    const weatherCard = screen.getByTestId("weather-card")
    const city = screen.getByTestId("city")
    const mainTemp = screen.getByTestId("main-temp")
    const description = screen.getByTestId("description")
    const feelsLike = screen.getByTestId("feels-like")
    const tempMin = screen.getByTestId("temp-min")
    const tempMax = screen.getByTestId("temp-max")
    const humidity = screen.getByTestId("humidity")
    const windSpeed = screen.getByTestId("wind-speed")
    const visibility = screen.getByTestId("visibility")


    expect(weatherCard).toBeInTheDocument()
    expect(city).toHaveTextContent("London")
    expect(mainTemp).toHaveTextContent("27°C")
    expect(description).toHaveTextContent("Sun")
    expect(feelsLike).toHaveTextContent("26°C")
    expect(tempMin).toHaveTextContent("25°C")
    expect(tempMax).toHaveTextContent("28°C")
    expect(humidity).toHaveTextContent("69 %")
    expect(windSpeed).toHaveTextContent("10 m/s")
    expect(visibility).toHaveTextContent("10 km")
  });
});
