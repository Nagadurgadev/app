# Weather App

Welcome to the Weather App! This application allows users to view the current weather, 5-day forecast, air quality index, and weather recommendations for multiple cities. Users can switch between light and dark modes, add and remove cities from their list, and save favorite cities for quick access. The app also supports auto-refresh to keep weather data up-to-date.


## Table of Contents
    ➼Features
    ➼Screenshots and Videos
    ➼Installation
    ➼Usage
    ➼Code Explanation
    ➼APIs Used
    ➼Future Enhancements
    ➼Features
## Features
    • Current Weather: Fetch and display the current weather for multiple cities.
    • 5-Day Forecast: View the 5-day weather forecast for each city.
    • Air Quality Index: Display the air quality index for each city.
    • Weather Recommendations: Provide recommendations based on the current weather conditions.
    • Add/Remove Cities: Add cities to your list to monitor their weather and remove them as needed.
    • Favorites: Save favorite cities for quick access.
    • Dark Mode: Toggle between light and dark modes for better visual comfort.
    • Auto-Refresh: Enable auto-refresh to automatically update weather data every 30 minutes.
    • Temperature Units: Switch between metric and imperial units (Celsius and Fahrenheit).
    • Auto-Suggest Cities: Suggest city names as you type in the search box.
## Screenshots
  ![Screenshot 2024-06-16 193000](https://github.com/A-k-A-s-H-1/app/assets/123860531/1d888b7e-2ebb-435c-a922-a31a6f950433)

  ![Screenshot 2024-06-16 193250](https://github.com/A-k-A-s-H-1/app/assets/123860531/8f489195-9474-4b95-b236-f1a3a1e0bc8e)

  ![Screenshot 2024-06-16 193352](https://github.com/A-k-A-s-H-1/app/assets/123860531/e8b4b612-a49b-4022-8df4-aa3dddf66f5f)
  ![Screenshot 2024-06-16 193431](https://github.com/A-k-A-s-H-1/app/assets/123860531/950672bb-6617-4fd3-8480-4ea2870451d4)
  
![Screenshot 2024-06-16 193642](https://github.com/A-k-A-s-H-1/app/assets/123860531/1471e0e6-7ade-4645-9b61-5ef7f85fafde)

![Screenshot 2024-06-16 193546](https://github.com/A-k-A-s-H-1/app/assets/123860531/73e2e68f-1428-45ee-b967-cbd39fef6d02)
<img width="929" alt="Screenshot7" src="https://github.com/A-k-A-s-H-1/app/assets/123860531/c0e78b97-551d-44a6-8c04-f741f6523fd6">

  https://github.com/A-k-A-s-H-1/app/assets/123860531/5609b24f-ebba-40e6-b4dc-ac397241660c




## Installation
1.Clone the repository:

```bash
  git clone https://github.com/A-k-A-s-H-1/weather-app.git
```
 2.Navigate to the project directory:
 ```bash
    cd weather-app
```
3.Install dependencies:
```bash
   npm install
```
4.Start the application:
```bash
   npm Start
```
    
## Usage
    ►Search for a City:
        Enter the name of a city in the search box.
        Select a city from the auto-suggest dropdown.
        Click the "Add City" button to fetch the weather data.
    ►View Weather Information:
       Weather information for the added city will be displayed, including current temperature, humidity, wind speed, and a description.
    ►5-Day Forecast:
         Scroll down to view the 5-day forecast chart for the selected city.
    ►Air Quality Index:
         Check the air quality index for the selected city.
    ►Weather Recommendations:
          Read recommendations based on the current weather conditions.
    ►Manage Cities:
        Use the checkboxes to select multiple cities and remove them.
        Save a city to favorites for quick access.
        Remove a city from the list if no longer needed.
    ►Toggle Dark Mode:
         Use the switch in the header to toggle between light and dark modes.
    ►Auto-Refresh:
         Enable auto-refresh to update weather data every 30 minutes.
    ►Switch Temperature Units:
         Use the button in the header to toggle between Celsius and Fahrenheit.

## Code Explanation
    App.js-->This is the main component of the Weather App. It includes the following key sections:
    State Variables:
         city: Stores the name of the city entered by the user.
         weatherDataList: Stores the weather data for multiple cities.
         loading: Indicates whether data is being loaded.
         error: Stores any error messages.
         darkMode: Indicates whether dark mode is enabled.
         selectedCities: Stores the indices of selected cities for batch operations.
         forecastData: Stores the 5-day forecast data for the selected city.
         unit: Stores the unit of temperature (metric or imperial).
         favorites: Stores the list of favorite cities.
         autoSuggestCities: Stores the list of cities suggested based on user input.
         autoRefresh: Indicates whether auto-refresh is enabled.
         airQuality: Stores the air quality data for the selected city.
         weatherRecommendations: Stores weather-based recommendations.
    API Calls:
         fetchWeather: Fetches current weather data from the OpenWeatherMap API.
         fetchForecast: Fetches 5-day forecast data from the OpenWeatherMap API.
         fetchAutoSuggestCities: Fetches city suggestions from the OpenWeatherMap API.
         fetchAirQuality: Fetches air quality data from the OpenWeatherMap API.
         fetchWeatherRecommendations: Provides recommendations based on weather conditions.
    Event Handlers:
         handleSubmit: Handles form submission to add a new city.
         toggleDarkMode: Toggles between dark mode and light mode.
         handleSelectCity: Handles the selection of a city.
         handleSelectAll: Selects or deselects all cities.
         handleRemoveSelected: Removes selected cities from the list.
         handleRemoveCity: Removes a specific city from the list.
         handleSaveFavorite: Saves a city to favorites.
         handleRemoveFavorite: Removes a city from favorites.
         toggleUnit: Toggles between Celsius and Fahrenheit.
         handleCityInputChange: Handles input change in the city search box.
         toggleAutoRefresh: Toggles the auto-refresh feature.
    Helper Functions:
         getIcon: Returns the appropriate weather icon based on the weather description.
         getCss: Returns the appropriate CSS class based on the weather description.
         getTemperatureData: Returns the temperature data for the 5-day forecast chart.
    App.css-->This file contains the styles for the Weather App, including:
         General styles for light and dark modes.
         Styles for the header, form, weather list, forecast chart, air quality index, and weather recommendations.
         Responsive design adjustments to ensure the app looks good on various screen sizes.


## APIs Used
     OpenWeatherMap API: Used to fetch current weather data, 5-day forecast, city suggestions, and air quality data.
        ![OpenWeatherMap API] (https://www.google.com/search?q=OpenWeatherMap+API&oq=OpenWeatherMap+API&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDzSAQgxNDk1ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8)

## live Demo
[live demo] (https://akashakkiweather.netlify.app/)
## Future Enhancements
    Weather Alerts: Integrate severe weather alerts for added safety.
    Localization: Add support for multiple languages.
    PWA: Convert the application into a Progressive Web App for offline access.
    User Authentication: Allow users to create accounts and save their preferences.
    Notifications: Send notifications for weather changes or severe weather alerts.
## Support
    Thank you for using the Weather App! If you have any questions or feedback, feel free to reach out.

For support, email chinnapareddyakashreddy16@gmail.com

