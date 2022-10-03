import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ApiHandler } from '../util/api';
import { Branch, Commit, GitlabError, IContextDefault, Issue, Project, Event, Label, BetterCommit } from '../util/types';


export const GitLabContext = createContext<IContextDefault>({} as IContextDefault);

const GitlabProvider = (props: {children?: ReactNode}) => {
    const [commits, setCommits] = useState<BetterCommit[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [currentProject, setCurrentProject] = useState<Project>({} as Project);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const apiHandler = new ApiHandler("", "");

    const getCommits = (): Commit[] | null => {
        if (error) return null;
        return commits;
    }

    const getBranches = (): Branch[] | null => {
        if (error) return null;
        return branches;
    }

    const getIssues = (): Issue[] | null => {
        if (error) return null;
        return issues;
    }

    const getCurrentProject = (): Project | null => {
        if (error) return null;
        return currentProject;
    }

    const updateData = () => {
        setLoading(true);
        apiHandler.update().then(data => {
            setCommits(data.commits.map((e: Commit) => ({created_at_date: new Date(new Date(e.created_at).setHours(0,0,0,0)), ...e})));
            setBranches(data.branches);
            setIssues(data.issues);
            setCurrentProject(data.currentProject);
            setLoading(false);
        }).catch((err: GitlabError) => {
            setError(true);
            console.error("Error in update");
            console.error(err.message);
        });
    }

    useEffect(() => {
        update();

    }, []);

    const update = async () => {
        const token = localStorage.getItem("token");
        const projectName = localStorage.getItem("projectName");

        if (token === null || projectName === null){
            setError(true);
            return;
        }

        const success = await apiHandler.updateDetails(token, projectName);

        if (!error && success)
            updateData();
        else
            console.error("Context is not setup correctly, need a valid Token and projectName")
    }

    return (
        <GitLabContext.Provider value={{
            commits: getCommits(),
            branches: getBranches(), 
            issues: getIssues(), 
            currentProject: getCurrentProject(), 
            error,
            loading,
            update
        }}>
            {props.children}
        </GitLabContext.Provider>
    )
}

export default GitlabProvider;
