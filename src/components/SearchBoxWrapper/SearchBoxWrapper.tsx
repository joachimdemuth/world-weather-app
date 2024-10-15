import { useRef, useEffect, useCallback } from 'react';

import { RecentSearch } from '../RecentSearches/Types/types';

import { getTypeOfSearch } from '../RecentSearches/utils/getTypeOfSearch';

import { SearchBoxRetrieveResponse } from '@mapbox/search-js-core';
import { SearchBox } from '@mapbox/search-js-react';
import { MAPBOX_API_KEY, theme } from '../Map/map.config';
import { SearchBoxRefType } from '@mapbox/search-js-react/dist/components/SearchBox';


type SearchBoxWrapperProps = {
    setRecentSearches: React.Dispatch<React.SetStateAction<RecentSearch[]>>;
    setIsLoading: (isLoading: boolean) => void;
    setCoords: (coords: [number, number]) => void;
}

export default function SearchBoxWrapper({
    setRecentSearches,
    setIsLoading,
    setCoords,
}: SearchBoxWrapperProps) {
    const searchBoxRef = useRef<SearchBoxRefType | null>(null);

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


    const handleSearch = useCallback(async (result: SearchBoxRetrieveResponse) => {
        setIsLoading(true);

        const [lng, lat] = result.features[0].geometry.coordinates;
        const recentSearch = await getTypeOfSearch(result);

        setRecentSearches((prevSearches: RecentSearch[]) => {
            const updatedSearches = [recentSearch, ...prevSearches];

            localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
            return updatedSearches;
        });

        setCoords([lng, lat]); 
        setIsLoading(false);
    }, [setCoords, setIsLoading, setRecentSearches]);


    return (
        <div className='absolute top-0 left-0 pt-4 w-full flex justify-center m-auto'>
            <SearchBox data-testid="search-box"
                placeholder='Click or CMD+K to search for a location'
                theme={theme}
                ref={searchBoxRef}
                accessToken={MAPBOX_API_KEY || ""}
                options={{ language: 'da', country: 'dk' }}
                onRetrieve={handleSearch} />
        </div>
    )
}
