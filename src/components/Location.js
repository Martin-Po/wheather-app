import { Box, Divider, ListItem, ListItemText, Paper } from "@mui/material"

const Location = ({ location, changeSelectedWaether }) => {
    if (!location ) return (<Box>
       
    </Box>)

    const handleOnClick = () => {
        changeSelectedWaether(location)
    }
return (

<ListItem button onClick={handleOnClick}>
<ListItemText primary={`${location.name}, ${location.state}, ${location.country}`} />
      </ListItem>)
}

export { Location }