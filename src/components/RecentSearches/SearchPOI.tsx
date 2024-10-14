import { RecentSearchPOI } from './Types/types';
import { Store } from 'lucide-react';

export default function SearchPOI( { search }: { search: RecentSearchPOI } ) {
     return (
			<>
			<div className='flex justify-center pt-[2px]'>
				<Store size={20} />
			</div>
			<div className='flex flex-col w-full'>
				<p className='font-semibold text-md'>{search.name}</p>

				<p className='text-sm text-gray-500'>
					{search.address}
				</p>
			</div>
			</>

	);
}