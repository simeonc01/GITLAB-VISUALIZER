import { CircularProgress, Divider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useContext, useEffect, useState } from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { countAmountPerDate, countAmoutPerAuthor, countAmoutPerType } from '../util/countHelper';
import { BetterEvent, KeyCount } from '../util/types';
import { GitLabContext } from './GitlabProvider';
import Container from './LayoutContainer';

enum DataTypes {
    Date = "Date",
    Author = "Author",
    Type = "Type"
}

const DrawChart = (props: {data: BetterEvent[], type: DataTypes}) => {
    const [filteredData, setFilteredData] = useState<KeyCount[]>([]);
    
    useEffect(() => {
        if (props.data.length !== 0)
            if (props.type === DataTypes.Date)
                setFilteredData(countAmountPerDate(props.data));
            else if (props.type === DataTypes.Author)
                setFilteredData(countAmoutPerAuthor(props.data));
            else if (props.type === DataTypes.Type)
                setFilteredData(countAmoutPerType(props.data));
    }, [props.data, props.type])

    return (
        <ResponsiveContainer width='100%' height={250}>
            <ComposedChart data={filteredData.reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="dataStuff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#154734" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#154734" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="index" tick={{ fontSize: '14px'}}/>
                <YAxis padding={{ top: 10 }} />
                <Tooltip></Tooltip>
                {props.type === DataTypes.Date && <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#dataStuff)"
                />}
                {props.type !== DataTypes.Date && <Bar
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#dataStuff)"
                />}
            </ComposedChart>
        </ResponsiveContainer>
    )
}

const Activity = () => {
    const [events, setEvents] = useState<BetterEvent[]>([]);
    const [type, setType] = useState<DataTypes>(DataTypes.Date);

    const context = useContext(GitLabContext);

    useEffect(() => {
        if (!context.loading) {
            if (context.events !== null) {
                setEvents(context.events);
            }
        }
    }, [context.loading, context.events])

    const handleChangeType = (event: React.MouseEvent<HTMLElement>, value: DataTypes) => {
        if (value !== null)
            setType(value);
    }

    //Hvordan vil vi presentere
    return(
        <Container>
            <Typography variant='h5'>Activity</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: ['400px', '600px'],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {context.loading && <CircularProgress/>}
                    {!context.loading && <DrawChart data={events} type={type}/>}
                    
                </Box>
                <Divider orientation='vertical'/>
                <ToggleButtonGroup sx={{paddingX: 2, width: 'fit-content'}} value={type} exclusive onChange={handleChangeType} orientation='vertical'>
                    <ToggleButton value={DataTypes.Date}>Date</ToggleButton>
                    <ToggleButton value={DataTypes.Author}>Author</ToggleButton>
                    <ToggleButton value={DataTypes.Type}>Type</ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Container>
    )
}

export default Activity; 
