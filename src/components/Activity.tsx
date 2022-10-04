import { CircularProgress, Divider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useContext, useEffect, useState } from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Event } from '../util/types';
import { GitLabContext } from './GitlabProvider';

enum DataTypes {
    Date = "Date",
    Author = "Author",
    Type = "Type"
}

interface BetterEvent extends Event {created_at_date: Date}

interface uniqueCount {
    [key: string]: number;
}

const countAmountPerDate = (list: BetterEvent[]) => {
    const r: uniqueCount = {};
    const uniqueDates = new Set<string>();
    list.map(d => (d.created_at_date.toISOString())).forEach(a => uniqueDates.add(a));
    uniqueDates.forEach(date => r[date] = 0);
    list.forEach(d => r[d.created_at_date.toISOString()]++);
    return Object.keys(r).map(k => ({index: new Date(k).toLocaleDateString('en-us'), count: r[k]}));
}

const countAmoutPerAuthor = (list: BetterEvent[]) => {
    const r: uniqueCount = {};
    const uniqueAuthors = new Set<string>();
    list.forEach(a => uniqueAuthors.add(a.author.username));
    uniqueAuthors.forEach(a => r[a] = 0);
    list.forEach(a => r[a.author.username]++);
    return Object.keys(r).map(k => ({index: k, count: r[k]}));
}

const countAmoutPerType = (list: BetterEvent[]) => {
    const r: uniqueCount = {};
    const uniqueTypes = new Set<string>();
    list.forEach(a => uniqueTypes.add(a.action_name));
    uniqueTypes.forEach(a => r[a] = 0);
    list.forEach(a => r[a.action_name]++);
    return Object.keys(r).map(k => ({index: k, count: r[k]}));
}

const DrawChart = (props: {data: Event[], type: DataTypes}) => {
    const [data, setData] = useState<BetterEvent[]>([]);
    const [filteredData, setFilteredData] = useState<{index: string, count: number}[]>([]);
    
    useEffect(() => {
        setData(props.data.map((e: Event) => ({created_at_date: new Date(new Date(e.created_at).setHours(0,0,0,0)), ...e})));
    }, [props.data]);

    useEffect(() => {
        if (props.data.length !== 0)
            if (props.type === DataTypes.Date)
                setFilteredData(countAmountPerDate(data));
            else if (props.type === DataTypes.Author)
                setFilteredData(countAmoutPerAuthor(data));
            else if (props.type === DataTypes.Type)
                setFilteredData(countAmoutPerType(data));
    }, [data, props.type])

    return (
        <ResponsiveContainer width='100%' height={250}>
            <ComposedChart data={filteredData} width={100} height={100}>
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="dataStuff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#154734" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#154734" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="index" tick={{ fontSize: '14px'}}/>
                <YAxis padding={{ top: 10 }} />
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
        if (value !== null)
            setType(value);
    }

    //Hvordan vil vi presentere
    return(
        <Box sx={{
            backgroundColor: 'background.paper',
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            boxShadow: 5
        }}>
            <Typography variant='h5'>Activity</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: '600px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {context.loading && <CircularProgress/>}
                    {!context.loading && <DrawChart data={events} type={type}/>}
                    
                </Box>
                <Divider orientation='vertical'/>
                <ToggleButtonGroup sx={{paddingX: 2}} value={type} exclusive onChange={handleChangeType} orientation='vertical'>
                    <ToggleButton value={DataTypes.Date}>Date</ToggleButton>
                    <ToggleButton value={DataTypes.Author}>Author</ToggleButton>
                    <ToggleButton value={DataTypes.Type}>Type</ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Box>
    )
}


export default Activity; 
