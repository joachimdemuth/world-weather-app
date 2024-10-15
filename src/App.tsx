import './App.css';
import { useState, useEffect, useCallback } from 'react'

import Map from './components/Map/Map';
import UnitSwitcher from './components/UnitSwitcher/UnitSwitcher';
import SearchBoxWrapper from './components/SearchBoxWrapper/SearchBoxWrapper';
import WeatherCard from './components/WeatherCard/WeatherCard';
import RecentSearches from './components/RecentSearches/RecentSearches';

import { getWeatherForLocation } from './api/getWeatherForLocation';

import { TempContext } from './contexts/TempContext';

import { WeatherData } from './components/WeatherCard/Types/types';
import { RecentSearch } from './components/RecentSearches/Types/types';


export default function App() {
	const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [searchResult, setSearchResult] = useState<string>("");
	const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [coords, setCoords] = useState<[number, number]>([12.5, 55.65]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			console.log("position", position);
			setCoords([position.coords.longitude, position.coords.latitude]);
		});
	}, []);

	useEffect(() => {
		const fetchWeatherData = async () => {
			const data = await getWeatherForLocation(coords[0], coords[1]);
			setWeatherData(data);
		};
		fetchWeatherData();
	}, [coords]);


	return (
		<TempContext.Provider value={unit}>
			<div className='flex w-full min-h-screen font-[family-name:var(--font-geist-sans)]'>

				<Map coords={coords} setCoords={setCoords} setSearchResult={setSearchResult} />
				<SearchBoxWrapper
					setRecentSearches={setRecentSearches}
					setIsLoading={setIsLoading}
					setCoords={setCoords}
				/>
				{weatherData && (
					<WeatherCard data={weatherData} city={searchResult} isLoading={isLoading} />
				)}
				<RecentSearches
					searches={recentSearches}
					setRecentSearches={setRecentSearches}
					setPosition={(lngLat, displayTitle) =>
						setCoords(lngLat)
					}
				/>
				<UnitSwitcher setUnit={setUnit} />
			</div>
		</TempContext.Provider>
	);
}

