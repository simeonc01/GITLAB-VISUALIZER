import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { IContextDefault, Label, Project } from '../util/types';
import { GitLabContext } from './GitlabProvider';

const InfoBox = (props: {project: Project, labels: Label[]}) => {
    return (
        <>
            <Typography variant='h6'>{props.project.name}</Typography>
            <Typography variant='body1'>{props.project.star_count}</Typography>
            <Typography variant='body1'>{new Date(props.project.last_activity_at).toDateString()}</Typography>
            <Typography variant='body1'>{new Date(props.project.created_at).toDateString()}</Typography>
            <Typography variant='body1'>{props.labels.length}</Typography>
        </>
    )
}

const ProjectInfo = (props?: any) => {

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

    useEffect(() => {
        console.log(project);
    }, [project])

    return (
        <Box sx={{minWidth: 300}} bgcolor={'background.paper'} boxShadow={1} borderRadius={2} maxWidth={500} p={2}>
            {context.loading && <CircularProgress />}
            {error && <></>}
            {!context.loading && 
                !error && project !== undefined &&
                <InfoBox project={project} labels={labels}/>
            }
        </Box>
    )
}

export default ProjectInfo;