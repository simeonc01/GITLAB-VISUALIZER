import { Box } from '@mui/system';
import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { LineType } from '../util/types';

interface Props {
    data: object[];
    xAxisKey: string;
    width: number;
    height: number;
    grid: boolean;
    lines: LineType[];
}

const GraphExample = (props: Props) => {
    return (
        <Box width={props.width} height={props.height}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={props.width} height={props.height} data={props.data}>
                    {(props.grid) && <CartesianGrid strokeDasharray="3 3" />}
                    <XAxis dataKey={props.xAxisKey}/>
                    <YAxis />
                    {props.lines.map(line => 
                        <Line type="monotone" dataKey={line.dataKey} stroke={line.stroke}/>
                    )}
                </LineChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default GraphExample;