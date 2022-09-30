import { Button, ButtonGroup, CircularProgress, Divider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useContext, useEffect, useState } from 'react';
import { AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Event } from '../util/types';
import { GitLabContext } from './GitlabProvider';

enum DataTypes {
    Date = "Date",
    Author = "Author",
    Type = "Type"
}

interface BetterEvent extends Event {created_at_date: Date}

const DrawChart = (props: {data: Event[], type: DataTypes}) => {
    const d: BetterEvent[] = props.data.map((e: Event) => ({created_at_date: new Date(e.created_at), ...e}));
    
    return (
        <ResponsiveContainer>
            <AreaChart data={props.data}>
                {props.type === DataTypes.Date && <XAxis dataKey="created_at_date"/>}
                <YAxis/>
            </AreaChart>
        </ResponsiveContainer>
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
            <Box sx={{
                width: '700px'
            }}>
                {context.loading && <CircularProgress/>}
                {!context.loading && <DrawChart data={events} type={type}/>}
                
            </Box>
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
