import { RecentSearchPOI, RecentSearchPlace, RecentSearchStreet, RecentSearchAddress, RecentSearchCountry, RecentSearch } from './Types/types';
import SearchPOI from './SearchPOI';
import SearchPlace from './SearchPlace';
import SearchStreet from './SearchStreet';
import SearchCountry from './SearchCountry';
import SearchAddress from './SearchAddress';

import { Trash2 } from 'lucide-react';


type SearchComponentRendererProps = {
    search: RecentSearch;
    onClick: () => void;
    handleRemoveSearch: (search: RecentSearch) => void;
}


export default function SearchComponentRenderer({ search, onClick, handleRemoveSearch }: SearchComponentRendererProps) {
    const activeType = search.type;
    const typeComponents = [
        { type: 'poi', component: <SearchPOI search={search as RecentSearchPOI} /> },
        { type: 'place', component: <SearchPlace search={search as RecentSearchPlace} /> },
        { type: 'country', component: <SearchCountry search={search as RecentSearchCountry} /> },
        { type: 'street', component: <SearchStreet search={search as RecentSearchStreet} /> },
        { type: 'address', component: <SearchAddress search={search as RecentSearchAddress} /> }
    ]




    return (
        <div onClick={onClick} className='flex flex-row gap-2 hover:bg-gray-200 hover:bg-opacity-50 border border-transparent hover:border-gray-200 hover:backdrop-blur-md rounded-md p-2 cursor-pointer'>
            {typeComponents.find(type => type.type === activeType)?.component}
            <div className='flex items-center'>

                <div onClick={(e) => { e.stopPropagation(); handleRemoveSearch(search) }} className='flex items-center h-6 w-6 p-1 justify-center rounded-md hover:bg-gray-300 cursor-pointer'>
                    <Trash2 size={20} className='text-red-500' />
                </div>
            </div>
        </div>
    )
}