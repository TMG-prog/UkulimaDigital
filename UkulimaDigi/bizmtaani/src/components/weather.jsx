import React, { useState, useEffect } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 
  const CITY = "Nairobi";

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid API Key or Limit Reached");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Debug API response
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weatherData) return <p>No weather data available.</p>;

  const { current, location } = weatherData;
  const condition = current.condition.text || "Unknown";
  const temperature = current.temp_c || "--";

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("clear")) return <WiDaySunny size={50} color="orange" />;
    if (conditionLower.includes("cloud")) return <WiCloud size={50} color="gray" />;
    if (conditionLower.includes("rain")) return <WiRain size={50} color="blue" />;
    if (conditionLower.includes("snow")) return <WiSnow size={50} color="lightblue" />;
    if (conditionLower.includes("thunder")) return <WiThunderstorm size={50} color="purple" />;
    return <WiCloud size={50} color="gray" />;
  };

  return (
    <div className="weather-widget">
      <h3>Weather in {location.name}</h3>
      {getWeatherIcon(condition)}
      <p>{condition}</p>
      <p>{temperature}°C</p>
    </div>
  );
};

export default WeatherWidget;