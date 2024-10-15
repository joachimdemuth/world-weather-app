import { useContext } from 'react';

import { TempContext } from '../../contexts/TempContext';

import { motion } from 'framer-motion';


export default function UnitSwitcher({ setUnit }: { setUnit: (unit: 'celsius' | 'fahrenheit') => void }) {
	const temperatureUnit = useContext(TempContext);

	return (
		<motion.div data-testid="unit-switcher" onClick={() => setUnit(temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius')} className='flex flex-row fixed p-1 left-4 bottom-4 h-10 items-center gap-1 bg-white border-[0.5px] border-gray-200 rounded-lg cursor-pointer z-20 ' >
            <div data-testid="celsius" className={`flex  w-8 h-8 justify-center items-center z-10 text-lg ${temperatureUnit === 'celsius' ? 'text-white' : 'text-gray-500'}`}>°C</div>
            <div data-testid="fahrenheit" className={`flex  w-8 h-8 justify-center items-center text-lg z-10 ${temperatureUnit === 'celsius' ? 'text-gray-500' : 'text-white'}`}>°F</div>
            <div className={`absolute w-8 h-8 bg-blue-600 rounded-[4px] ${temperatureUnit === 'celsius' ? 'left-1' : 'left-[calc(100%-2rem-4px)]'} transition-all duration-300 ease-in-out shadow-lg`} ></div>
		</motion.div>
	);
}
