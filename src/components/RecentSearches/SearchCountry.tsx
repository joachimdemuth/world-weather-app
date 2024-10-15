import { RecentSearchCountry } from './Types/types';

import { Flag } from 'lucide-react';


export default function SearchCountry({ search }: { search: RecentSearchCountry }) {
	return (
		<>
            <div className='flex justify-center pt-[2px]'>
                <Flag size={20} />
            </div>
            <div className='flex flex-col w-full'>
                <p className='font-semibold text-md'>{search.country}</p>
			</div>
		</>
	);
}