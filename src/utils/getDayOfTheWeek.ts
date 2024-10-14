export function getDayOfTheWeek(date: Date) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}