export type WeatherData = {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	sunrise: number;
	sunset: number;
	humidity: number;
	wind_speed: number;
	visibility: number;
	description: string;
	main: string;
	icon: string;
	wind_deg: number;
	daily: DailyWeatherData[];
};

export type DailyWeatherData = {
	dt: number;
	temp: {
		max: number;
	};
	weather: [
        {
            description: string;
			icon: string;
		}
	];
};

