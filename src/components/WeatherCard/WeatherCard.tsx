import { useContext } from 'react';

import { LoadingWeatherCard } from './LoadingWeatherCard';

import { formatTemperature } from '../../utils/formatTemperature';

import { TempContext } from '../../contexts/TempContext';

import { formatTime } from '../../utils/formatTime';

import { getDayOfTheWeek } from '../../utils/getDayOfTheWeek';

import { WeatherData } from './Types/types';
import { DailyWeatherData } from './Types/types';

import { MapPin, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';


const WeatherCardVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
};

type WeatherCardProps = {
	data: WeatherData;
	city: string;
	isLoading: boolean;
}

export default function WeatherCard({
	data,
	city,
	isLoading,
}: WeatherCardProps) {
	const temperatureUnit = useContext(TempContext);
	console.log("data",data)

	if (isLoading) {
		return <LoadingWeatherCard />;
	}

	return (
		<>
			{data && (
				<motion.div
					variants={WeatherCardVariants}
					initial='hidden'
					animate='visible'
					className='flex flex-col gap-4 min-w-[350px] h-auto text-slate-900 bg-white rounded-lg p-4 shadow-md absolute top-0 right-4'
				>
					<div className='flex flex-row justify-between'>
						<div className='flex flex-row items-center gap-2'>
							<MapPin size={20} />
							<p className='text-lg font-semibold'>{city}</p>
						</div>
					</div>
					<div className='flex w-full flex-col'>
						<div className='flex flex-col w-full items-center justify-between py-4 border-b border-slate-200'>
							<div className='flex justify-center items-center flex-col gap-2'>
								<p className='text-lg  font-semibold'>
									{data.main.slice(0, 1).toUpperCase() + data.main.slice(1)}
								</p>
								<div className='flex flex-row items-start font-semibold'>
									<span className='text-6xl'>
										{formatTemperature(data.temp, temperatureUnit).toFixed(0)}
									</span>
									<span>{temperatureUnit === 'celsius' ? '°C' : '°F'}</span>
								</div>
								<div className='text-sm text-gray-500'>
									Feels like:{' '}
									{formatTemperature(data.feels_like, temperatureUnit).toFixed(
										0,
									)}
									{temperatureUnit === 'celsius' ? '°C' : '°F'}
								</div>
							</div>
							<div className='flex flex-col text-sm text-gray-500'>
								<div className='flex flex-row items-center gap-2'>
									<span>H:</span>

									{formatTemperature(data.temp_max, temperatureUnit).toFixed(0)}
									{temperatureUnit === 'celsius' ? '°C' : '°F'}
								</div>
								<div className='flex flex-row items-center gap-2'>
									<span>L:</span>

									{formatTemperature(data.temp_min, temperatureUnit).toFixed(0)}
									{temperatureUnit === 'celsius' ? '°C' : '°F'}
								</div>
							</div>
						</div>

						<div className='flex w-full justify-between flex-row gap-6 py-4 border-b border-slate-200'>
							<div className='flex w-full justify-center text-sm flex-col '>
								<div className='flex w-full justify-center text-lg'>
									{formatTime(new Date(data.sunrise * 1000))}
								</div>
								<div className='flex w-full justify-center font-semibold text-gray-500'>
									Sunrise
								</div>
							</div>
							<div className='justify-center w-full items-center text-sm flex flex-col'>
								<div className='flex w-full justify-center text-lg'>
									{formatTime(new Date(data.sunset * 1000))}
								</div>

								<div className='flex w-full justify-center font-semibold text-gray-500'>
									Sunset
								</div>
							</div>
						</div>
					</div>

					<div className='flex flex-row py-4 border-b border-slate-200'>
						<div className='flex flex-col w-full justify-end items-center'>
							<p className='text-lg'>{data.humidity} %</p>
							<p className='font-semibold text-sm text-gray-500'>Humidity</p>
						</div>
						<div className='flex flex-col w-full justify-end items-center'>
							<div
								className={`transform`}

							>
								<ArrowUp size={20} style={{transform: `rotate(${data.wind_deg}deg)`}}/>
							</div>

							<p className='text-lg'>{data.wind_speed} km/h</p>
							<p className='font-semibold text-sm text-gray-500'>Wind</p>
						</div>
						<div className='flex flex-col w-full justify-end items-center'>
							<p className='text-lg'>{data.visibility / 1000} km</p>
							<p className='font-semibold text-sm text-gray-500'>Visibility</p>
						</div>
					</div>
					<div className='flex flex-row gap-4'>
						{data.daily.slice(1, 6).map((day: DailyWeatherData) => (
							<div
								key={day.dt}
								className='flex flex-col items-center justify-center'
							>
								<img
									src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
									alt={day.weather[0]?.description}
								/>
								<p className='text-md '>
									{formatTemperature(day.temp.max, temperatureUnit).toFixed(0)}
									{temperatureUnit === 'celsius' ? '°C' : '°F'}
								</p>
								<div className='text-sm font-semibold text-gray-500'>
									{getDayOfTheWeek(new Date(day.dt * 1000))}
								</div>
							</div>
						))}
					</div>
				</motion.div>
			)}
		</>
	);
}


