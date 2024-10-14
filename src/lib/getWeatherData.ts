export default async function getWeatherData(lng: number, lat: number) {
    try {
        const res = await fetch(`/api/get-weather-for-location?lng=${lng}&lat=${lat}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return [];
    }
}