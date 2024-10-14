# World Weather App

## Description
This is a small web app build on React using MapBox and OpenWeatherMap for getting weather forecast through interactions with a map.

The application is based around the map on which you can either choose to click on a location or search for a location in the search bar. Clicking on a result in the search bar will fly you to the chosen location and provide the current weather plus a 5 day forecast for the area. Using the search bar to find a location will also add your search to the "Recent searches" box on the left side. In this box you can quick and easily revisit your frequent locations.

Recent searches are saved in your local storage.

## Tech
The app is built with React and TypeScript as per the requirements. As I am not currently using TypeScript it took me a bit of time to get back into the flow of it, but i believe I managed to implement it to a certain degree. 

For styling I have used Tailwind as it is the quickest way for me to get styling up and running. It is especially a good tool for rapid prototyping if you know how to use it. 

## Test
For tests I am using Jest. Tests are a fairly new area for me and therefore they might not be as good as one could expect, but I tried to do some tests for the sake of learning.


# User guide
1. Clone the repository to your local machine
`
git clone https://github.com/yourusername/world-weather-app.git 
`

2. Navigate to the folder
`
cd world-weather-app
`

3. Install dependencies
`
npm install
`

4. Create a .env file in the root of the project and add these keys
```
REACT_APP_MAPBOX_ACCESS_TOKEN=YOUR_MAPBOX_ACCESS_TOKEN
REACT_APP_OPEN_WEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
```

The keys can be obtained at these links: 

OpenWeatherMap: https://openweathermap.org/api
MapBox:https://www.mapbox.com/

5. Run the app
`
npm start
`

