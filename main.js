
const API_KEY = 'b114f2f3f48002418ac4225a20535ad9'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';


const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const weatherIcon = document.getElementById('weatherIcon');


searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});


async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        
        const response = await fetch(
            `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        
        
        updateWeatherUI(data);
        
    } catch (error) {
         alert(error.message);
        resetWeatherUI();
    }
}


function updateWeatherUI(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = Math.round(data.main.temp);
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
    // weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
	// Mapping API icon codes to pixel image filenames
const iconMap = {
    '01d': 'sun.png',
    '01n': 'sun.png',
    '02d': 'cloudy.png',
    '02n': 'cloudy.png',
    '03d': 'cloudy.png',
    '03n': 'cloudy.png',
    '04d': 'cloudy.png',
    '04n': 'cloudy.png',
    '09d': 'rain.png',
    '09n': 'rain.png',
    '10d': 'rain.png',
    '10n': 'rain.png',
    '11d': 'rain.png',
    '11n': 'rain.png',
    '13d': 'snow.png',
    '13n': 'snow.png',
    '50d': 'mist.png',
    '50n': 'mist.png'
};


const iconCode = data.weather[0].icon;

// Optional fallback if the code doesn't match
const fallbackIcon = 'default.png'; // Put a default image with your icons

weatherIcon.src = iconMap[iconCode] || fallbackIcon;
weatherIcon.alt = data.weather[0].description;


	weatherIcon.alt = data.weather[0].description;
    weatherIcon.style.display = 'block';
}


function resetWeatherUI() {
    cityName.textContent = '--';
    temperature.textContent = '--';
    description.textContent = '--';
    humidity.textContent = '--%';
    windSpeed.textContent = '-- km/h';
    weatherIcon.style.display = 'none';
    // weatherIcon.src = 'notfound.png'; 
    weatherIcon.alt = 'City not found';
}


resetWeatherUI();