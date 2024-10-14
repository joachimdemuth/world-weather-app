import React from 'react';
import logo from './logo.svg';
import './App.css';


import { useState } from 'react'

import Map from './components/Map/Map';
import UnitSwitcher from './components/UnitSwitcher/UnitSwitcher';

import { TempContext } from './contexts/TempContext';


export default function App() {
	const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
	

	return (
		<TempContext.Provider value={unit}>
			<div className='flex w-full min-h-screen font-[family-name:var(--font-geist-sans)]'>
				<Map />
				<UnitSwitcher setUnit={setUnit} />
			</div>
		</TempContext.Provider>
	);
}

