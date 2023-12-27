const { Box, Typography, Skeleton } = require("@mui/material")

const UserLocationWeather = ({ weather }) => {
    console.log('inside weather');
    console.log(weather);
    if (!weather ) return (<Box></Box>)
    return (
        <Box sx={{display:'flex', flexDirection:'row'}}>            
        <img
            style={{height: '3rem', width:'3rem'
            }}
            src={'https://openweathermap.org/img/wn/'+ weather.weather[0].icon +'@2x.png'}
            alt="Martin Ponce"
        />
        <Box sx={{display:'flex', flexDirection:'column'}}>
        
            <Typography>{Math.floor((weather.main.temp - 273.15) * 10) / 10} °C</Typography>
            <Typography>{weather.name}</Typography>
        </Box>
    </Box>
    )
    }


    const Weather = ({ weather }) => {
        if (!weather ) return (<Box>
            <Skeleton variant="rectangular" width={210} height={118} />
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Box>
        </Box>)
return (

    <Box>
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>            
<img
            style={{height: '10rem', width:'10rem'
            }}
            src={'https://openweathermap.org/img/wn/'+ weather.weather[0].icon +'@2x.png'}
            alt="Martin Ponce"
        />
        <Box>
            <Typography sx={{fontSize:'3rem'}}>{Math.floor((weather.main.temp - 273.15) * 10) / 10} °C</Typography>
            <Typography sx={{fontSize:'1.25rem', fontWeight:'600'}}>{weather.name}</Typography>

        </Box>


</Box>
        <Typography sx={{fontSize:'1rem'}}>feels like: {Math.floor((weather.main.feels_like - 273.15) * 10) / 10} °C. {weather.weather[0].description}</Typography>
        <Typography sx={{fontSize:'1rem'}}>Humidity: {weather.main.humidity}%. Pressure: {weather.main.pressure}hpa</Typography>
    </Box>
)
}

export { Weather, UserLocationWeather }