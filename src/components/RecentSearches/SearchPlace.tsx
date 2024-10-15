import { RecentSearchPlace } from './Types/types';

import { Globe2 } from 'lucide-react';

export default function SearchPlace({ search }: { search: RecentSearchPlace }) {
	console.log('search', search);
	return (
		<>
			<div className='flex justify-center pt-[2px]'>
				<Globe2 size={20} />
			</div>
			<div className='flex flex-col w-full'>
				<p className='font-semibold text-md'>{search.city}</p>

				<p className='text-sm text-gray-500'>{search.country}</p>
			</div>
		</>
	);
}
