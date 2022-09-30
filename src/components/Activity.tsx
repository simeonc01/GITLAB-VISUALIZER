import { Button, ButtonGroup, Divider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useContext, useEffect, useState } from 'react';
import { Event } from '../util/types';
import { GitLabContext } from './GitlabProvider';

enum DataTypes {
    Date = "Date",
    Author = "Author",
    Type = "Type"
}

const EnumBox = (props: {text: any}) => {
    return (
        <ToggleButton value={props.text}>{props.text}</ToggleButton>
    )
}

const Activity = () => {

    const [events, setEvents] = useState<Event[]>([]);
    const [type, setType] = useState<DataTypes>(DataTypes.Date);

    const context = useContext(GitLabContext);

    useEffect(() => {
        if (!context.loading) {
            if (context.events !== null)
                setEvents(context.events);
        }
    }, [context.loading])

    const handleChangeType = (event: React.MouseEvent<HTMLElement>, value: DataTypes) => {
        setType(value);
    }

    //Hvordan vil vi presentere
    return(
        <Box sx={{
            backgroundColor: 'background.paper',
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box></Box>
            <Divider orientation='vertical'/>
            <ToggleButtonGroup value={type} exclusive onChange={handleChangeType} orientation='vertical'>
                {/* {(Object.keys(DataTypes) as Array<keyof typeof DataTypes>).map(k => <EnumBox key={k} text={k}/>)} */}
                <ToggleButton value={DataTypes.Date}>Date</ToggleButton>
                <ToggleButton value={DataTypes.Author}>Author</ToggleButton>
                <ToggleButton value={DataTypes.Type}>Type</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    )
}


export default Activity; 
