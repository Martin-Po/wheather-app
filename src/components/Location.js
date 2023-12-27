import { Box } from "@mui/material"

const Location = ({ location }) => {
    if (!location ) return (<Box>
       
    </Box>)
return (

<Box>
   {location.name}
</Box>
)
}

export { Location }