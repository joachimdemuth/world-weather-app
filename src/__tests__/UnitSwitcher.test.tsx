import { fireEvent, render, screen } from "@testing-library/react";
import { useState, useContext } from "react";

import { TempContext } from "../contexts/TempContext";
import UnitSwitcher from "../components/UnitSwitcher/UnitSwitcher";
import WeatherCard from "../components/WeatherCard/WeatherCard";

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => {
    const [unit, setUnit] = useState("celsius");
    return (
      <TempContext.Provider value={unit}>
        {children}
        <UnitSwitcher setUnit={setUnit} />
      </TempContext.Provider>
    );
  };

  describe("UnitSwitcher", () => {
    it("The UnitSwitcher should toggle the TempContext between Celsius and Fahrenheit when clicked", () => {

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


        render(<ComponentWrapper>
            <WeatherCard data={mockData} city="London" isLoading={false} />
        </ComponentWrapper>)

        const unitSwitcher = screen.getByTestId("unit-switcher")
        const temp = screen.getByTestId("main-temp")

        expect(temp).toHaveTextContent("27°C")

        fireEvent.click(unitSwitcher)
                
        expect(temp).toHaveTextContent("80°F")

        fireEvent.click(unitSwitcher)

        expect(temp).toHaveTextContent("27°C")
    })
})