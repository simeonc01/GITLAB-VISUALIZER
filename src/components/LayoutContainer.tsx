import { Box } from '@mui/material';
import React, { ReactNode } from 'react';


const Container = (props: {children: ReactNode, ignoreHeightWidth?: boolean}) => {
    return (
        <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: 5,
            borderRadius: 2,
            padding: 2,
            margin: 2,
            height: (props.ignoreHeightWidth !== undefined && props.ignoreHeightWidth === true) ? 'fit-content' : {
                sx: 200,
                md: 275
            },
            width: (props.ignoreHeightWidth !== undefined && props.ignoreHeightWidth === true) ? 'fit-content' : undefined
        }}>
            {props.children}
        </Box>
    )
}

export default Container;