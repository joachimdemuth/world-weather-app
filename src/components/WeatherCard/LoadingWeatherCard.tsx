export const LoadingWeatherCard = () => {
	return (
		<div className='flex flex-col min-w-[350px] text-slate-900 bg-white bg-opacity-50 backdrop-blur-md rounded-lg p-4 shadow-md absolute top-16 right-4'>
			<div className='flex flex-col gap-4'>
				<div className='h-4 bg-slate-200 rounded w-full'></div>
				<div className='h-4 bg-slate-200 rounded w-full'></div>
				<div className='h-4 bg-slate-200 rounded w-full'></div>
				<div className='h-4 bg-slate-200 rounded w-full'></div>
			</div>
		</div>
	);
};