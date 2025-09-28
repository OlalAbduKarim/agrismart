
import type { WeatherData, Forecast } from '../types';

const weatherConditions = [
    { condition: 'Sunny', icon: 'wb_sunny' },
    { condition: 'Partly Cloudy', icon: 'cloud' },
    { condition: 'Cloudy', icon: 'cloudy' },
    { condition: 'Rainy', icon: 'water_drop' },
    { condition: 'Thunderstorm', icon: 'thunderstorm' },
];

const getDayOfWeek = (offset: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const futureDay = new Date(today);
    futureDay.setDate(today.getDate() + offset);
    return days[futureDay.getDay()];
};

// This is a mock function. In a real application, you would call a weather API.
export const getWeatherForDistrict = async (district: string): Promise<WeatherData> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate random but plausible weather data for Uganda
    const currentCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const currentTemp = Math.floor(Math.random() * (32 - 18 + 1)) + 18; // Temp between 18°C and 32°C

    const forecast: Forecast[] = [
        { day: getDayOfWeek(1), icon: weatherConditions[Math.floor(Math.random() * weatherConditions.length)].icon, temp: Math.floor(Math.random() * (32 - 18 + 1)) + 18 },
        { day: getDayOfWeek(2), icon: weatherConditions[Math.floor(Math.random() * weatherConditions.length)].icon, temp: Math.floor(Math.random() * (32 - 18 + 1)) + 18 },
        { day: getDayOfWeek(3), icon: weatherConditions[Math.floor(Math.random() * weatherConditions.length)].icon, temp: Math.floor(Math.random() * (32 - 18 + 1)) + 18 },
    ];

    return {
        district,
        temperature: currentTemp,
        condition: currentCondition.condition,
        icon: currentCondition.icon,
        forecast,
    };
};
