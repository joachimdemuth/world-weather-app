export const formatTemperature = (temp: number, unit: string) => {

    if (unit === 'celsius') {
        // return temp - 273.15
        return temp
    } else {
        return (temp - 273.15) * 9/5 + 32
    }
}