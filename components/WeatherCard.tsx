
import React from 'react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const ForecastItem: React.FC<{ day: string; icon: string; temp: number }> = ({ day, icon, temp }) => (
  <div className="flex flex-col items-center space-y-1 p-2 bg-white/20 rounded-lg">
    <p className="text-sm font-semibold">{day}</p>
    <span className="material-icons-outlined text-2xl">{icon}</span>
    <p className="font-bold">{temp}°</p>
  </div>
);

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-2xl shadow-lg m-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-poppins text-xl">{weatherData.district}</h3>
          <p className="text-sm opacity-80">Now</p>
        </div>
        <div className="text-right">
          <p className="font-poppins text-5xl font-bold">{weatherData.temperature}°C</p>
          <p className="font-semibold">{weatherData.condition}</p>
        </div>
      </div>
      <div className="flex items-center justify-center my-4">
         <span className="material-icons-outlined text-8xl opacity-90">{weatherData.icon}</span>
      </div>
      <div className="mt-4">
        <p className="font-semibold mb-2">3-Day Forecast</p>
        <div className="grid grid-cols-3 gap-2">
          {weatherData.forecast.map(item => (
            <ForecastItem key={item.day} day={item.day} icon={item.icon} temp={item.temp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const WeatherCardSkeleton: React.FC = () => (
    <div className="bg-gray-200 p-4 rounded-2xl shadow-lg m-4 animate-pulse">
        <div className="flex justify-between items-start">
            <div className="space-y-2">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-12 bg-gray-300 rounded"></div>
            </div>
            <div className="h-12 w-20 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center justify-center my-4 h-20">
           <div className="h-20 w-20 bg-gray-300 rounded-full"></div>
        </div>
        <div className="mt-4">
            <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="grid grid-cols-3 gap-2">
                <div className="h-24 bg-gray-300 rounded-lg"></div>
                <div className="h-24 bg-gray-300 rounded-lg"></div>
                <div className="h-24 bg-gray-300 rounded-lg"></div>
            </div>
        </div>
    </div>
)

export default WeatherCard;
