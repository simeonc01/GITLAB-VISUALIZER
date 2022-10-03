import { Box, CircularProgress, Divider, Tooltip, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { IContextDefault, Label, Project } from '../util/types';
import { GitLabContext } from './GitlabProvider';
import Container from './LayoutContainer';

const LabelComponent = (props: {label: Label}) => {
    if (props.label.description !== null && props.label.description !== "") {
        return (
            <Tooltip title={props.label.description} placement="bottom">
                <Box style={{backgroundColor: props.label.color, color: props.label.text_color}} borderRadius={1} display={'inline-block'}>
                    <Typography variant='body1' paddingX={1}>{props.label.name}</Typography>
                </Box>
            </Tooltip>
        )
    } else {
        return (
            <Box sx={{
                backgroundColor: props.label.color,
                color: props.label.text_color,
                borderRadius: 1,
                display: 'inline-block',
                width: 'fit-content',
                margin: 0.25
            }}>
                <Typography variant='body2' paddingX={1}>{props.label.name}</Typography>
            </Box>  
        )
    }
}

const InfoBox = (props: {project: Project, labels: Label[]}) => {
    return (
        <>
            <Typography variant='h5' sx={{
                textTransform: "capitalize"
            }}>{props.project.name}</Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                width: 1,
                flexDirection: 'row'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    width: 'fit-content',
                    marginRight: 0.5
                }}>
                    <Typography variant='body1'>⭐ Your project has {props.project.star_count} stars</Typography>
                    <Typography variant='body1'>💪 The last activity was at {new Date(props.project.last_activity_at).toDateString()}</Typography>
                    <Typography variant='body1'>🥚 Your project was created at {new Date(props.project.created_at).toDateString()}</Typography>
                    <Typography variant='body1'>🍴 Your project has been forked {props.project.forks_count} times</Typography>
                </Box>
                <Divider orientation='vertical' flexItem/>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    float: 'right',
                    alignItems: 'center',
                    marginLeft: 1
                }}>
                    <Typography variant='body1'>Your projects labels:</Typography>
                    {props.labels.map(l => <LabelComponent label={l}/>)}
                </Box>
            </Box>
        </>
    )
}

const ProjectInfo = () => {

    const context = useContext<IContextDefault>(GitLabContext);

    const [project, setProject] = useState<Project>();
    const [labels, setLabels] = useState<Label[]>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!context.loading) {
            if (context.currentProject !== null && context.labels !== null) {
                setProject(context.currentProject);
                setLabels(context.labels);
            }
            else
                setError(true)
        }
    }, [context.loading]);

    return (
        <Container>
            {context.loading && <CircularProgress />}
            {!context.loading && !error && project !== undefined && labels.length !== 0 &&
                <InfoBox project={project} labels={labels}/>
            }
        </Container>
    )
}

export default ProjectInfo;