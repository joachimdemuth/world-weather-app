export default async function getLocationByCoords(lng: number, lat: number) {
    try {
        const res = await fetch(`/api/get-location-by-coords?lng=${lng}&lat=${lat}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return [];
    }
}