import { useState, useEffect, useRef } from 'react';

import { MAPBOX_API_KEY, theme } from './map.config';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getLocationByCoords } from '../../api/getLocationByCoords';



type MapNewProps = {    
    coords: [number, number];
    setCoords: (coords: [number, number]) => void;
    setSearchResult: (searchResult: string) => void;
}

export default function MapNew({coords, setCoords, setSearchResult}: MapNewProps) {

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current || !MAPBOX_API_KEY) {
            console.error('Map container not found or MAPBOX_API_KEY not found');
            return;
        }

        
            
            mapboxgl.accessToken = MAPBOX_API_KEY;


            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: coords,
                zoom: 14,
            });

            mapRef.current.on('load', async () => {
                try {
                    const location = await getLocationByCoords(coords[0].toString(), coords[1].toString());
                    setSearchResult(location.title);
                } catch (error) {
                    console.error("Error fetching location by coords", error);
                }

            });

            mapRef.current.on('click', async (e) => {
                setCoords([e.lngLat.lng, e.lngLat.lat]);

                try {
                    const location = await getLocationByCoords(e.lngLat.lng.toString(), e.lngLat.lat.toString());
                    setSearchResult(location.title);
                } catch (error) {
                    console.error("Error fetching location by coords", error);
                }
                
            });



            markerRef.current = new mapboxgl.Marker()
                .setLngLat(coords)
                .addTo(mapRef.current);



        return () => {
            mapRef.current?.remove();
        };
    }, []);

    useEffect(() => {
        markerRef.current?.setLngLat(coords);
        mapRef.current?.flyTo({
            center: coords,
            zoom: 14,
        });
    }, [coords]);
    
    return(
        <>
        <div ref={mapContainerRef} className="fixed top-0 left-0 flex w-full min-h-screen"></div>
        </>
    )
}