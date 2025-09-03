import React from 'react';
import './AQIDisplay.css';

const AQIDisplay = ({ aqiData,textcol }) => {
if (!aqiData) return null;

const { aqi, pm10, pm25, o3, no2, so2, co } = aqiData;
const {darkMode}=textcol

const getAQIColor = (aqi) => {
if (aqi <= 50) return 'green';
if (aqi <= 100) return 'yellow';
if (aqi <= 150) return 'orange';
if (aqi <= 200) return 'red';
if (aqi <= 300) return 'purple';
return 'maroon';
};

const getAQILevel = (aqi) => {
if (aqi <= 50) return 'Good';
if (aqi <= 100) return 'Moderate';
if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
if (aqi <= 200) return 'Unhealthy';
if (aqi <= 300) return 'Very Unhealthy';
return 'Hazardous';
};

return (
    <div className="aqi-container">
      <h2>Air Quality Index (AQI)</h2>
      <div className="aqi-info">
        <div className="aqi-value" style={{ backgroundColor: getAQIColor(aqi) }}>
          <p>AQI: {aqi}</p>
          <p>Level: {getAQILevel(aqi)}</p>
        </div>
        <div className="pollutants">
          <p>PM10: {pm10} µg/m³</p>
          <p>PM2.5: {pm25} µg/m³</p>
          <p>O3: {o3} µg/m³</p>
          <p>NO2: {no2} µg/m³</p>
          <p>SO2: {so2} µg/m³</p>
          <p>CO: {co} µg/m³</p>
        </div>
      </div>
      <div className="health-advisory">
        <p>Health Advisory based on AQI:</p>
        <ul className={darkMode ? 'dark-mode' : 'light-mode'}>
  {aqi <= 50 && <li>Air quality is considered satisfactory, and air pollution poses little or no risk.</li>}
  {aqi > 50 && aqi <= 100 && <li>Air quality is acceptable; however, for some pollutants, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.</li>}
  {aqi > 100 && aqi <= 150 && <li>Members of sensitive groups may experience health effects. The general public is not likely to be affected.</li>}
  {aqi > 150 && aqi <= 200 && <li>Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.</li>}
  {aqi > 200 && aqi <= 300 && <li>Health alert: everyone may experience more serious health effects.</li>}
  {aqi > 300 && <li>Health warnings of emergency conditions. The entire population is more likely to be affected.</li>}
</ul>


      </div>
    </div>
  );
};

export default AQIDisplay;
