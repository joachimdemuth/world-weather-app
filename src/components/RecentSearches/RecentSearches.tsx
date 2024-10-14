'use client';
import { useEffect } from 'react';

import SearchComponentRenderer from './SearchComponentRenderer';

import { RecentSearch } from './Types/types';

import { motion } from 'framer-motion';


const RecentSearchesVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
};

type RecentSearchesProps = {
	searches: RecentSearch[];
	setPosition: (lngLat: [number, number], displayTitle: string) => void;
	setRecentSearches: (searches: RecentSearch[]) => void;
};

export default function RecentSearches({
	searches,
	setPosition,
	setRecentSearches,
}: RecentSearchesProps) {

	useEffect(() => {
		const searches = localStorage.getItem('recentSearches');
		if (searches) {
			setRecentSearches(JSON.parse(searches));
		}
	}, []);

	const handleRecentSearchClick = (search: RecentSearch) => {
		setPosition(search.lngLat, search.displayTitle);
		console.log("search", search);
	};

	const handleRemoveSearch = (search: RecentSearch) => {
		const newSearches = searches.filter((s) => s !== search);
		setRecentSearches(newSearches);
		localStorage.setItem('recentSearches', JSON.stringify(newSearches));
	};

	return (
		<motion.div
			variants={RecentSearchesVariants}
			initial='hidden'
			animate='visible'
			className={`fixed flex flex-col w-[350px] gap-4 text-slate-900 bg-white rounded-lg p-4 shadow-md left-4`}
		>
			<div className='flex flex-row justify-between'>
				<div className='text-lg font-semibold flex items-center'>
					Recent Searches
				</div>
			</div>
			{searches.length > 0 ? (
				<div className='flex flex-col w-full gap-1'>
					{searches.slice(0, 5).map((search: RecentSearch, index: number) => (
						<SearchComponentRenderer
							key={index}
							search={search}
							onClick={() => handleRecentSearchClick(search)}
							handleRemoveSearch={() => handleRemoveSearch(search)}
						/>
					))}
				</div>
			) : (
				<div className='text-center text-sm text-slate-500'>
					No recent searches
				</div>
			)}
		</motion.div>
	);
}
