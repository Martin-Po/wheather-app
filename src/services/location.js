import axios from 'axios';
const baseUrl = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/geo/1.0/';

const config = require('../utils/config');

const getLocationByCoordinates = (lat, lon, limit) => {
  const request = axios.get(`${baseUrl}reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${config.API_KEY}`);
  return request.then(response => response.data);
};

const getLocationByName = (name, limit) => {
    const request = axios.get(`${baseUrl}direct?q=${name}&limit=${limit}&appid=${config.API_KEY}`);
    return request.then(response => response.data);
  };

export default { getLocationByCoordinates, getLocationByName };