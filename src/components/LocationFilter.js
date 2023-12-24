import {
    Box,
    InputAdornment,
    TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'

const LocationFilter = ({ filterCountries }) => {
    const [filter, setFilter] = useState('')

    const handleChange = (event) => {
        const newFilter = event.target.value
        setFilter(newFilter)
        filterCountries(newFilter)
    }

    return (
        <Box
            sx={{
                width: {
                    xs: '100%',
                    sm: 'auto',
                },
                marginBottom: {
                    xs: '0.5rem',
                    sm: 'auto',
                },
                padding: {
                    xs: '0.5rem',
                    sm: 'auto',
                },
            }}
        >
            <TextField
                fullWidth
                value={filter}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                id="outlined"
                label='Filter by country'                
                variant="outlined"
                onChange={handleChange}
            />
        </Box>
    )
}

export { LocationFilter}
