export const formatTemperature = (temp: number, unit: string) => {

    if (unit === 'celsius') {
        return (temp - 273.15).toFixed(0) + "°C"

    } else {
        return ((temp - 273.15) * 9/5 + 32).toFixed(0) + "°F"
    }
}