import { RecentSearchStreet } from './Types/types';

import { GitCommitVertical } from 'lucide-react';

export default function SearchStreet({
	search,
}: {
	search: RecentSearchStreet;

}) {
	return (
		<>
			<div className='flex justify-center pt-[2px]'>
				<GitCommitVertical size={20} />
			</div>
			<div className='flex flex-col w-full'>
				<p className='font-semibold text-md'>{search.title}</p>

				<p className='text-sm text-gray-500'>
					{search.postcode}, {search.city}
				</p>
			</div>
		</>
	);
}
