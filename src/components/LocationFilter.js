import {
    Box,
    InputAdornment,
    TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'
import locationService from '../services/location'

const LocationFilter = ({ filterLocations }) => {
    const [filter, setFilter] = useState('')

    const handleChange = (event) => {
        const newFilter = event.target.value
        setFilter(newFilter)
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        const locations = await locationService.getLocationByName(filter, 5)
        filterLocations(locations)
    }

    return (
        <form onSubmit={handleSubmit}>
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
        </form>
    )
}

export { LocationFilter }