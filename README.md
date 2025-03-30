# World Weather App

## Description
World Weather App is a React-based web app that provides weather forecast through interactions with a map.

The application is based around the map on which you can either choose to click on a location or search for a location in the search bar. Clicking on a result in the search bar will fly you to the chosen location and provide the current weather plus a 5 day forecast for the area. Using the search bar to find a location will also add your search to the "Recent searches" box on the left side. In this box you can revisit your frequent locations quickly and easily.

Recent searches are saved in your local storage.

In the bottom left corner you will find a UnitSwitcher that switches between Celsius and Fahrenheit. The temperatures in the WeatherCard are updated based on the value of the switch.

## Features

<li>Interactive map powered by MapBox</li>
<li>Weather data from OpenWeatherMap API</li>
<li>Search functionality for locations</li>
<li>Recent searches saved to local storage</li>
<li>Current weather and a 5-day forecast</li>
<li>Switch between Celsius and Fahrenheit</li>


## Tech stack

<li>React</li>
<li>TypeScript</li>
<li>Tailwind CSS</li>
<li>MapBox GL JS</li>
<li>Jest for testing</li>


## Test
For tests I am using Jest. Tests are a fairly new area for me and therefore they might not be as good as one could expect, but I tried to do some tests for the sake of learning.
I had a lot of trouble with rendering the Map from Mapbox in the tests and was not able to solve it. The error was the following: 

```
 ReferenceError: TextDecoder is not defined

    import { MAPBOX_API_KEY, theme } from './map.config';
    import mapboxgl from 'mapbox-gl';
```

Therefore I chose to focus on the components that i wrote myself and the data displayed in these components.
I have written test for both of these components:

```
<UnitSwitcher />
<WeatherCard />
```

To run the tests, navigate to the root of the project and start the tests:
```
npm run test
```

## Setup and installation
1. Clone the repository
  
```
git clone https://github.com/joachimdemuth/world-weather-app.git 
```


2. Navigate to the project folder
```
cd world-weather-app
```


3. Install dependencies
```
npm install
```


4. Create a .env file in the root of the project and add the following keys:
```
REACT_APP_MAPBOX_ACCESS_TOKEN=YOUR_MAPBOX_ACCESS_TOKEN
REACT_APP_OPEN_WEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
```

Obtain keys from:

OpenWeatherMap: https://openweathermap.org/api
<br>
MapBox: https://www.mapbox.com/


5. Start the development server
```
npm start
```

