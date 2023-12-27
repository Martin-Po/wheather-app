import axios from 'axios';
const config = require('../utils/config');

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'


const getWeatherByCoordinates = (lat, lon) => {
  const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${config.API_KEY}`);
  return request.then(response => response.data);
};


export default { getWeatherByCoordinates};