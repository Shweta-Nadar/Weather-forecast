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

async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        
        const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();     
        updateWeatherUI(data);
        
    } catch (prob) {
         alert(prob.message);
        resetWeatherUI();
    }
}


function updateWeatherUI(data) {
    cityName.innerHTML = `${data.name}, ${data.sys.country}`;
    temperature.innerHTML = Math.round(data.main.temp);
    description.innerHTML = data.weather[0].description;
    humidity.innerHTML = `${data.main.humidity}%`;
    windSpeed.innerHTML = `${data.wind.speed} km/h`; 
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.style.display = 'block';
}


function resetWeatherUI() {
    cityName.innerHTML = '--';
    temperature.innerHTML = '--';
    description.innerHTML = '--';
    humidity.innerHTML = '--%';
    windSpeed.innerHTML = '-- km/h';
    weatherIcon.style.display = 'none';
}


resetWeatherUI();
