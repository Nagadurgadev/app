import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import { Oval } from 'react-loader-spinner';
import { FaSun, FaCloudSun, FaCloud, FaCloudShowersHeavy, FaBolt, FaSnowflake, FaSmog } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import AQIDisplay from './AQIDisplay';
import { Button,Switch } from '@mui/material';
import { WbSunny, Brightness2,Add,RemoveCircle} from '@mui/icons-material';
const App = () => {
  const [city, setCity] = useState('');
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [favorites, setFavorites] = useState([]);
  const [autoSuggestCities, setAutoSuggestCities] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [airQuality, setAirQuality] = useState(null);
  const [severeWeatherAlerts, setSevereWeatherAlerts] = useState([]);
  const [weatherRecommendations, setWeatherRecommendations] = useState('');

  const API_KEY = '066d23f989a65a72b8e75ccea708d41f'; // Replace with your OpenWeatherMap API key

  // Fetch current weather data from API
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`);
      return response.data;
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch 5-day forecast data from API
  const fetchForecast = useCallback(async (cityName) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}`);
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast data', error);
    }
  }, [API_KEY, unit]);

  // Fetch auto-suggest cities based on user input
  const fetchAutoSuggestCities = async (query) => {
    if (query.length < 3) return;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${API_KEY}&type=like&sort=population&cnt=5`);
      setAutoSuggestCities(response.data.list);
    } catch (error) {
      console.error('Error fetching auto-suggest data', error);
    }
  };

  // Handle form submission to add a new city
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim() === '') {
      setError('City name cannot be empty');
      return;
    }
    const weatherData = await fetchWeather(city);
    if (weatherData) {
      const timestamp = new Date();
      setWeatherDataList((prevList) => [...prevList, { ...weatherData, timestamp }]);
      fetchForecast(city);
      fetchAirQuality(weatherData.coord); // Fetch air quality for the new city
      
      fetchWeatherRecommendations(weatherData.weather[0].main); // Fetch weather recommendations based on weather condition
    }
    setCity('');
  };

  // Toggle between dark mode and light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle selection of a city (for multi-select checkboxes)
  const handleSelectCity = (index) => {
    setSelectedCities((prevSelectedCities) => {
      if (prevSelectedCities.includes(index)) {
        return prevSelectedCities.filter((i) => i !== index);
      } else {
        return [...prevSelectedCities, index];
      }
    });
  };

  // Select or deselect all cities
  const handleSelectAll = () => {
    if (selectedCities.length === weatherDataList.length) {
      setSelectedCities([]);
    } else {
      const allIndexes = weatherDataList.map((_, index) => index);
      setSelectedCities(allIndexes);
    }
  };

  // Remove selected cities from the weather data list
  const handleRemoveSelected = () => {
    setWeatherDataList((prevList) =>
      prevList.filter((_, index) => !selectedCities.includes(index))
    );
    setSelectedCities([]);
  };

  // Remove a specific city from the weather data list
  const handleRemoveCity = (index) => {
    setWeatherDataList((prevList) => prevList.filter((_, i) => i !== index));
  };

  // Save a city to favorites
  const handleSaveFavorite = (cityName) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(cityName)) return prevFavorites;
      return [...prevFavorites, cityName];
    });
  };

  // Remove a city from favorites
  const handleRemoveFavorite = (cityName) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav !== cityName));
  };

  // Get weather icon based on weather description
  const getIcon = (description) => {
    switch (description) {
      case 'clear sky':
        return <FaSun style={{ color: '#FFD700' }} />; // Yellow color for sun
      case 'few clouds':
        return <FaCloudSun style={{ color: '#87CEEB' }} />; // Light blue color for few clouds
      case 'scattered clouds':
      case 'broken clouds':
        return <FaCloud style={{ color: '#778899' }} />; // Slate gray color for scattered/broken clouds
      case 'shower rain':
      case 'rain':
        return <FaCloudShowersHeavy style={{ color: '#4682B4' }} />; // Steel blue color for rain
      case 'thunderstorm':
        return <FaBolt style={{ color: '#FFD700' }} />; // Yellow color for thunderstorm (adjust as needed)
      case 'snow':
        return <FaSnowflake style={{ color: '#FFFFFF' }} />; // White color for snow
      case 'mist':
        return <FaSmog style={{ color: '#A9A9A9' }} />; // Dark gray color for mist
      default:
        return <FaCloud style={{ color: '#778899' }} />; // Default color for unknown conditions
    }
  };
  const getCss = (description) => {
    switch (description.toLowerCase()) {
      case 'clear sky':
        return 'clear-sky';
      case 'few clouds':
        return 'few-clouds';
      case 'scattered clouds':
      case 'broken clouds':
        return 'scattered-clouds';
      case 'shower rain':
      case 'rain':
        return 'rain';
      case 'thunderstorm':
        return 'thunderstorm';
      case 'snow':
        return 'snow';
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'dust':
      case 'fog':
      case 'sand':
      case 'ash':
      case 'squall':
      case 'tornado':
        return 'other-weather';
      default:
        return 'default-icon';
    }
  };
  

  // Toggle between metric and imperial units
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  // Get temperature data for the 5-day forecast
  const getTemperatureData = () => {
    if (!forecastData) return null;

    const labels = forecastData.list.map((item) =>
      new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );

    const data = forecastData.list.map((item) => item.main.temp);

    return {
      labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
      ],
    };
  };

  // Fetch air quality information
  const fetchAirQuality = async (coordinates) => {
    const { lat, lon } = coordinates;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const aqiData = {
        aqi: response.data.list[0].main.aqi,
        pm10: response.data.list[0].components.pm10,
        pm25: response.data.list[0].components.pm2_5,
        o3: response.data.list[0].components.o3,
        no2: response.data.list[0].components.no2,
        so2: response.data.list[0].components.so2,
        co: response.data.list[0].components.co,
      };
      setAirQuality(aqiData);
    } catch (error) {
      console.error('Error fetching air quality data', error);
    }
  };

  // Fetch severe weather alerts
  

  // Fetch weather recommendations based on weather condition
  const fetchWeatherRecommendations = (weatherCondition) => {
    const recommendations = {
      'Clear': "It's clear skies! Perfect weather for outdoor activities.",
      'Clouds': 'Partly cloudy today. Consider bringing an umbrella just in case.',
      'Rain': "Rain expected. Don't forget your raincoat or umbrella.",
      'Thunderstorm': 'Thunderstorms are forecasted. Stay indoors and avoid open areas.',
      'Drizzle': 'Expect some drizzle today. Carry an umbrella.',
      'Snow': 'Snowfall expected. Dress warmly and drive safely.',
      'Mist': "It's misty outside. Drive carefully and use fog lights if necessary.",
      'Smoke': 'Air quality might be affected by smoke. Limit outdoor exposure.',
      'Haze': 'Hazy conditions observed. Consider wearing a mask outdoors.',
      'Dust': 'Dusty conditions today. Use a mask and avoid prolonged outdoor activities.',
      'Fog': 'Foggy weather. Drive with caution and use low beams.',
      'Sand': 'Windy with blowing sand. Protect your eyes and wear suitable clothing.',
      'Ash': 'Ashfall expected. Wear protective gear if venturing outside.',
      'Squall': 'Expect squally weather. Secure loose objects outdoors.',
      'Tornado': 'Tornado alert! Seek shelter immediately and stay tuned for updates.',
    };

    setWeatherRecommendations(recommendations[weatherCondition] || '');
  };

  // Handle geolocation and fetch weather data for the current location
  useEffect(() => {
    const handleGeolocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          if (weatherDataList.length === 0) {
            setLoading(true);
            setError('');
            try {
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`);
              const weatherData = response.data;
              const timestamp = new Date();
              setWeatherDataList((prevList) => [...prevList, { ...weatherData, timestamp }]);
              fetchForecast(weatherData.name);
              fetchAirQuality(weatherData.coord);
            
              fetchWeatherRecommendations(weatherData.weather[0].main);
            } catch (error) {
              setError('Error fetching weather data. Please try again.');
            } finally {
              setLoading(false);
            }
          }
        });
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    handleGeolocation();

    // Set up auto-refresh every 30 minutes
    const interval = setInterval(() => {
      if (autoRefresh && weatherDataList.length > 0) {
        const lastCity = weatherDataList[weatherDataList.length - 1].name;
        fetchWeather(lastCity);
      }
    }, 1000 * 60 * 30); // 30 minutes in milliseconds

    return () => clearInterval(interval);
  }, [API_KEY, unit, weatherDataList.length, fetchForecast, autoRefresh]);

  // Handle input change in city search input field
  const handleCityInputChange = (e) => {
    const query = e.target.value;
    setCity(query);
    fetchAutoSuggestCities(query);
  };

  // Toggle auto-refresh feature
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header>
      <div className="header-icon">
            <FaSun style={{ color: '#f0c929', fontSize: '2rem' }} />
            <h1 className='main-heading'>Weather App</h1>
      </div>
      
        <Switch
           checked={darkMode}
           onChange={toggleDarkMode}
           color="default"
           icon={<Brightness2 />}
           checkedIcon={<WbSunny />}
        />
        <div className="controls">
          <label>
            Auto-Refresh:
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={toggleAutoRefresh}
            />
          </label>
          <Button
             variant="contained"
             color="warning"
             onClick={toggleUnit}
                              >
          {unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
          </Button>

          <label>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedCities.length === weatherDataList.length}
            />
            Select All
          </label>
          <Button
              variant="contained"
              color="error"
              onClick={handleRemoveSelected}
              disabled={selectedCities.length === 0}
              startIcon={<RemoveCircle />}
              >
              Remove Selected
          </Button>
        </div>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={handleCityInputChange}
            placeholder="Enter city name"
            list="auto-suggest"
          />
          <datalist id="auto-suggest">
            {autoSuggestCities.map((city, index) => (
              <option key={index} value={city.name} />
            ))}
          </datalist>
          <Button
             variant="contained"
             color="success"
             type="submit"
             startIcon={<Add/>}
            >
            Add City
          </Button>
        </form>
        {loading && (
    <div className="loader-container">
      <Oval height={40} width={40} color={darkMode ? 'white' : 'blue'} ariaLabel="loading" />
    </div>
        )}
        {error && <p className="error-message">{error}</p>}
        <div className="weather-list">
          {weatherDataList.map((weatherData, index) => (
            <div key={index} className={`weather-info ${getCss(weatherData.weather[0].description)}`}>
              <input
                type="checkbox"
                checked={selectedCities.includes(index)}
                onChange={() => handleSelectCity(index)}
              />
              <h2>{getIcon(weatherData.weather[0].description)} Weather Information</h2>
              <p>Location: {weatherData.name}</p>
              <p>Temperature: {weatherData.main.temp} {unit === 'metric' ? '°C' : '°F'}</p>
              <p>Humidity: {weatherData.main.humidity} %</p>
              <p>Pressure: {weatherData.main.pressure} hPa</p>
              <p>Wind Speed: {weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
              <p>Description: {weatherData.weather[0].description}</p>
              <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
              <p>Fetched at: {weatherData.timestamp.toLocaleString()}</p>
              <button onClick={() => handleSaveFavorite(weatherData.name)} className="favorite-button">Add to Favorites</button>
              <button onClick={() => handleRemoveCity(index)} className="remove-button">Remove</button>
            </div>
          ))}
        </div>
        {forecastData && (
          <div className="forecast-chart">
            <h2>5-Day Forecast</h2>
            <Line data={getTemperatureData()} />
          </div>
        )}
        <div className="favorites">
          <h2>Favorites</h2>
          {favorites.map((favorite, index) => (
            <div key={index} className="favorite-city">
              <p>{favorite}</p>
              <button onClick={() => handleRemoveFavorite(favorite)}>Remove</button>
            </div>
          ))}
        </div>

        {airQuality && <AQIDisplay aqiData={airQuality} textcol={darkMode}/>}
        {weatherRecommendations && (
          <div className="weather-recommendations">
            <h2>Weather-based Recommendations</h2>
            <p>{weatherRecommendations}</p>
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2024 Weather App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;






















