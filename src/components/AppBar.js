import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Container from '@mui/material/Container'
import { UserLocationWeather } from './Weather'


import { Typography } from '@mui/material'


function ResponsiveAppBar({weather}) {
    console.log('inside appbar');
    console.log(weather);
    
    
    
    
    

    const handleLanguageChange = () => {
        // Dispatch the action
      }

      const handleThemeChange = () => {
        // Dispatch the action
      }

    return (
        <AppBar position="static" style={{ backgroundColor: 'primary.main', boxShadow: 'none'}}>
            <Container 
                maxWidth={false}
                
                sx={{
                    width: '1280px',

                    '@media (max-width:1300px)': {
                        width: '992px',
                    },
                    '@media (max-width:1024px)': {
                        width: '100%',
                    },
                }}
            >
                <Toolbar disableGutters>
                    <UserLocationWeather weather = {weather}/>
                    
                    <Box
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            justifyContent: 'flex-end',
                        }}
                    >                        
                        
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
