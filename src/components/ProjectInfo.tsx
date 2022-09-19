import { Card, CircularProgress } from '@mui/material';
import React, { useContext } from 'react';
import { IContextDefault } from '../util/types';
import { GitLabContext } from './GitlabProvider';

const ProjectInfo = (props?: any) => {

    const context = useContext<IContextDefault>(GitLabContext);

    return (
        <Card>
            {(context.loading) && <CircularProgress />}
            {(!context.loading) &&
                <h3>{(context.currentProject !== null) ? context.currentProject.name : "error"}</h3>
            }
        </Card>
    )
}

export default ProjectInfo;