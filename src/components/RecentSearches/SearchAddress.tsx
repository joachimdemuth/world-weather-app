import { RecentSearchAddress } from '../RecentSearches/Types/types';

import { MapPinHouse } from 'lucide-react';

export default function SearchAddress({ search }: { search: RecentSearchAddress }) {
	return (
		<>
			<div className='flex justify-center pt-[2px]'>
				<MapPinHouse size={20} />
			</div>
			<div className='flex flex-col w-full'>
				<p className='font-semibold text-md'>{search.displayTitle}</p>

				<p className='text-sm text-gray-500'>
					{search.address}
				</p>
			</div>
		</>

	);
}