  import React, { useEffect, useState } from 'react'
  import { LocationFilter } from './components/LocationFilter'
  import Grid from '@mui/material/Unstable_Grid2'
  import locationService from './services/location'
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        console.log('userlocation function');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude + ' ' + longitude);
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting user location:', error);
            reject(error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        reject(new Error('Geolocation not supported'));
      }
    });
  };  

  const getLocationName = async (userLocation) => {
    if (userLocation) {
      console.log('getlocationname');
      try {
        const location = await locationService.getLocationByCoordinates(
          userLocation.latitude,
          userLocation.longitude,
          5
        );
  
        const name = location[0].name;
  
        // Store in localStorage
        localStorage.setItem('locationName', name);
  
        return name;
      } catch (error) {
        console.error('Error getting location name:', error);
        throw error;
      }
    } else {
      console.error('User location is not defined.');
    }
  };


  function App() {
      const [userLocation, setUserLocation] = useState(null)
      const [locationName, setlocationName] = useState(null)
      const cachedLocationName = localStorage.getItem('locationName')  

      

      useEffect(() => {
        if (cachedLocationName) {
          console.log('is cache');
          console.log(cachedLocationName);
          // Use the cached locationName if it exists
          setlocationName(cachedLocationName)
          console.log('location ' + locationName);
      } else
        {
          console.log('not cache');
          changeUserLocation()
        }
    }, [])

    const changeUserLocation = async () => {
      console.log('onclick');
      try {
        const location = await getUserLocation();
        console.log('Location:', location);
        setUserLocation(location);
    
        if (location) {
          const name = await getLocationName(location);
          console.log('Name:', name);
          setlocationName(name);
        }
      } catch (error) {
        console.error('Error changing user location:', error);
      }
    };
    console.log(localStorage.getItem('locationName'));
console.log('location name ' + locationName);
console.log('userlocation ' + userLocation);
console.log(userLocation);


      return (
          <div style={{ minHeight: '100vh', position: 'relative' }}>
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
                  {userLocation && (
                      <div>
                          <h2>User Location</h2>
                          <p>Latitude: {userLocation.latitude}</p>
                          <p>Longitude: {userLocation.longitude}</p>
                      </div>
                  )}
                  {locationName && <div>
                    <p>Location: {locationName}</p>
                    
                  </div> 
                  }
              </Grid>
          </div>
      )
  }

  export default App
