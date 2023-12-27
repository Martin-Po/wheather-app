import React, { useEffect, useRef, useState } from 'react'
import { LocationFilter } from './components/LocationFilter'
import Grid from '@mui/material/Unstable_Grid2'
import locationService from './services/location'
import weatherService from './services/weather'
import AppBar from './components/AppBar'
import { wait } from '@testing-library/user-event/dist/utils'
import { set } from 'mongoose'
import { Weather } from './components/Weather'
import { CssBaseline } from '@mui/material'

const getLocationName = async (userLocation) => {
    if (userLocation) {
        try {
            const location = await locationService.getLocationByCoordinates(
                userLocation.latitude,
                userLocation.longitude,
                5
            )

            const name = location[0].name

            // Store in localStorage
            localStorage.setItem('locationName', name)

            return name
        } catch (error) {
            console.error('Error getting location name:', error)
            throw error
        }
    } else {
        console.error('User location is not defined.')
    }
}

const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    const location = { latitude, longitude }
                    getLocationName(location)
                        .then((name) => {
                            resolve({ latitude, longitude, name })
                        })
                        .catch((error) => {
                            reject(error)
                        })
                },
                (error) => {
                    console.error('Error getting user location:', error)
                    reject(error)
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.')
            reject(new Error('Geolocation not supported'))
        }
    })
}

const getWeatherByCoordinates = async (selectedLocation) => {
    if (selectedLocation) {
        try {
            const weather = await weatherService.getWeatherByCoordinates(
                selectedLocation.latitude,
                selectedLocation.longitude
            )

            return weather
        } catch (error) {
            console.error('Error getting weather:', error)
            throw error
        }
    } else {
        console.error('Location is not defined.')
    }
}

function App() {
    const [userLocation, setUserLocation] = useState(null) //User curren location, shown in top left corner
    const [userLocationWeather, setUserLocationWeather] = useState(null) //User curren location, shown in top left corner

    const [locationName, setlocationName] = useState(null) //Location retrieved, if one, set selectedlocation, if not, max 5 to select from
    const [weather, setWeather] = useState(null) //weathen shown
    const [selectedLocation, setSelectedLocation] = useState(null) //The one shown

    const cachedLocationName = localStorage.getItem('locationName')
    const cachedLatitude = localStorage.getItem('latitude')
    const cachedLongitude = localStorage.getItem('longitude')

    const isFirstRender = useRef(true)

    useEffect(() => {
        const SetLocations = (location) => {
            if (!location) return
            getWeatherByCoordinates(location).then((weather) => {
                setUserLocationWeather(weather)
                setWeather(weather)
            })
            setUserLocation({
                latitude: location.latitude,
                longitude: location.longitude,
                name: location.name,
            })
            setSelectedLocation({
                latitude: location.latitude,
                longitude: location.longitude,
                name: location.name,
            })
        }

        const getUserLocationFromCache = async () => {
            if (cachedLocationName) {
                const location = {
                    latitude: cachedLatitude,
                    longitude: cachedLongitude,
                    name: cachedLocationName,
                }
                return location
            } else {
                return getUserLocation().then((location) => {
                    localStorage.setItem('latitude', location.latitude)
                    localStorage.setItem('longitude', location.longitude)
                    localStorage.setItem('name', location.name)
                    return location
                })
            }
        }

        getUserLocationFromCache().then((location) => {
            SetLocations(location)
        })
    }, [])

    const changeUserLocation = async () => {
        try {
            const location = await getUserLocation()
            console.log('entered')
            if (location) {
                const name = await getLocationName(location)
                setUserLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    name: name,
                })
                localStorage.setItem('latitude', location.latitude)
                localStorage.setItem('longitude', location.longitude)
                localStorage.setItem('name', name)
                getWeatherByCoordinates(location)
                    .then((weather) => {
                        setUserLocationWeather(weather)
                        setUserLocation({ ...location, name: weather.name })
                    })
                    .catch((error) => {
                        console.error('Error fetching weather:', error)
                    })
            }
        } catch (error) {
            console.error('Error changing user location:', error)
        }
    }

    console.log('weather')
    console.log(weather)
    console.log(userLocationWeather);
    console.log(userLocation)
    console.log('weather2')

    return (
        <div style={{ minHeight: '100vh', position: 'relative', width:'100vw' }}>
            <CssBaseline />

            <AppBar weather ={userLocationWeather} />
            <Grid
                container
                spacing={{ xs: 0, md: 4 }}
                sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '1280px',
                    marginTop: '56px',
                    display: 'flex',
                    flexDirection: 'column',

                    '@media (max-width:1300px)': {
                        width: '992px',
                    },
                    '@media (max-width:1024px)': {
                        width: '100%',
                    },
                }}
            >
                <LocationFilter />
                <h1>Geolocation App</h1>
                <button onClick={changeUserLocation}>Get User Location</button>
                {selectedLocation && (
                    <div>
                        <h2>User Location</h2>
                        <p>Latitude: {selectedLocation.latitude}</p>
                        <p>Longitude: {selectedLocation.longitude}</p>
                    </div>
                )}
                {selectedLocation && (
                    <div>
                        <p>Location: {selectedLocation.name}</p>
                    </div>
                )}
                <Grid xs={12} sm={6} >
                <Weather weather={weather}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default App
