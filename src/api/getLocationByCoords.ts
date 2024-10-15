interface LocationData {
  title: string;
}

export async function getLocationByCoords(lng: string, lat: string): Promise<LocationData> {
  if (!lng || !lat) {
    throw new Error('lng and lat are required');
  }

  const apiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  if (!apiKey) {
    throw new Error('MAPBOX_ACCESS_TOKEN is not set');
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch location data');
    }
    const data = await res.json();
    const features = data.features;
    
    const city = features.find((feature: any) => feature.id.includes('place'))?.text || "";
    const country = features.find((feature: any) => feature.id.includes('country'))?.text || "";
    const title = city ? `${city}, ${country}` : "";

    return { title };
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
}
