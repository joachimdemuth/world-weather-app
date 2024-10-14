'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

import WeatherCard from '../WeatherCard/WeatherCard';
import RecentSearches from '../RecentSearches/RecentSearches';

import { WeatherData } from '../WeatherCard/Types/types';
import { RecentSearch } from '../RecentSearches/Types/types';

import { getTypeOfSearch } from '../RecentSearches/utils/getTypeOfSearch';
import { getWeatherForLocation } from '../../api/getWeatherForLocation';
import { getLocationByCoords } from '../../api/getLocationByCoords';

import { MAPBOX_API_KEY, theme } from './map.config';
import { SearchBoxRetrieveResponse } from '@mapbox/search-js-core';
import { SearchBox } from '@mapbox/search-js-react';


import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SearchBoxRefType } from '@mapbox/search-js-react/dist/components/SearchBox';


export default function Map() {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [searchResult, setSearchResult] = useState<string>("");
	const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	// REFS
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const markerRef = useRef<mapboxgl.Marker | null>(null);
	const searchBoxRef = useRef<SearchBoxRefType | null>(null);

	const initialPos = [55.665, 12.5];

	// INIT MAP
	useEffect(() => {
		console.log("MAPBOX_API_KEY", MAPBOX_API_KEY);
		console.log("mapContainerRef.current", mapContainerRef.current);
		if (!mapContainerRef.current || !MAPBOX_API_KEY) {
			console.error('Map container not found or MAPBOX_API_KEY not found');
			return;
		}

		mapboxgl.accessToken = MAPBOX_API_KEY;

		mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [initialPos[1], initialPos[0]],
			zoom: 14,
		});

		markerRef.current = new mapboxgl.Marker()
			.setLngLat([initialPos[1], initialPos[0]])
			.addTo(mapRef.current);


		return () => {
			mapRef.current?.remove();
		};

	}, []);


	// FETCH WEATHER DATA
	const fetchWeatherData = useCallback(async (lng: number, lat: number) => {
		setIsLoading(true);
		try {
			const weather = await getWeatherForLocation(lng, lat);
			const location = await getLocationByCoords(lng.toString(), lat.toString());
			setWeatherData(weather);
			setSearchResult(location.title);
		} catch (error) {
			console.error('Error fetching initial data:', error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchWeatherData(initialPos[1], initialPos[0]);
	}, [fetchWeatherData]);


	// HANDLE MAP CLICK

	const handleMapClick = useCallback((e: mapboxgl.MapMouseEvent) => {
		console.log("handleMapClick", e.lngLat)
		const { lng, lat } = e.lngLat;
		fetchWeatherData(lng, lat);
		markerRef.current?.setLngLat([lng, lat]);
	}, [fetchWeatherData]);

	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.on('click', handleMapClick)
			return () => mapRef.current?.off('click', handleMapClick);
		}
		return () => { };
	}, [handleMapClick]);






	// HANDLE SEARCH 
	const handleSearch = async (result: SearchBoxRetrieveResponse) => {
		setIsLoading(true);
		console.log("Starting handleSearch")
		console.log("result", result)
		const lngLat = result.features[0].geometry.coordinates;

		const recentSearch = await getTypeOfSearch(result);

		// UPDATE RECENT SEARCHES & UPDATE LOCAL STORAGE
		setRecentSearches((prevSearches) => {
			const updatedSearches = [recentSearch, ...prevSearches];

			localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
			return updatedSearches;
		});

		// FLY TO THE SEARCH RESULT
		mapRef.current?.flyTo({
			center: [lngLat[0], lngLat[1]],
			zoom: 12,
		});

		// GET WEATHER DATA FOR THE SEARCH RESULT
		try {
			const weatherData = await getWeatherForLocation(lngLat[0], lngLat[1]);
			setWeatherData(weatherData);
			setSearchResult(
				result.features[0].properties.name_preferred ||
				result.features[0].properties.name,
			);
			markerRef.current?.setLngLat([lngLat[0], lngLat[1]]);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching weather data:', error);
			setIsLoading(false);
		}
	};

	// HANDLING SEARCH SHORTCUT

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.metaKey && e.key === 'k') {
				searchBoxRef.current?.focus();
				e.preventDefault();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);


	// IF THERE ARE ANY RECENT SEARCHES IN MEMORY, DISPLAY THEM
	useEffect(() => {
		const savedSearches = localStorage.getItem('recentSearches');
		if (savedSearches) {
			setRecentSearches(JSON.parse(savedSearches));
		}
	}, []);


	const handleRecentSearchPosition = useCallback(async (latLng: [number, number],
		displayTitle: string,) => {

		setIsLoading(true);
		const weatherData = await getWeatherForLocation(latLng[0], latLng[1]);
		setWeatherData(weatherData);
		setSearchResult(displayTitle);

		mapRef.current?.flyTo({
			center: latLng,
			zoom: 14,
		});

		markerRef.current?.setLngLat(latLng);
		setIsLoading(false);
	}, []);

	return (
		<>
			<div
				id='map-container'
				className='fixed top-0 left-0 w-full h-20 min-h-screen'
				ref={mapContainerRef}
			></div>
			<div className='fixed flex w-full justify-center top-4 left-1/2 -translate-x-1/2 '>
				<SearchBox
					placeholder='Click or CMD+K to search for a location'
					theme={theme}
					ref={searchBoxRef}
					accessToken={MAPBOX_API_KEY || ""}
					options={{ language: 'da', country: 'dk' }}
					onRetrieve={handleSearch}
				/>

				<RecentSearches
					searches={recentSearches}
					setRecentSearches={setRecentSearches}
					setPosition={(lngLat, displayTitle) =>
						handleRecentSearchPosition(lngLat, displayTitle)
					}
				/>

				{weatherData && (
					<WeatherCard
						data={weatherData}
						city={searchResult}
						isLoading={isLoading}
					/>
				)}
			</div>
		</>
	);
}
