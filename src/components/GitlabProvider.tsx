import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ApiHandler } from '../util/api';
import { Branch, Commit, GitlabError, IContextDefault, Issue, Project } from '../util/types';


export const GitLabContext = createContext<IContextDefault>({} as IContextDefault);

const GitlabProvider = (props: {children?: ReactNode}) => {
    const [commits, setCommits] = useState<Commit[]>([]);
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
            setCommits(data.commits);
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
        update(localStorage.getItem("token"), localStorage.getItem("projectName"));

    }, []);

    const update = async (token: string | null , projectName: string | null) => {
        if (token === null || projectName === null){
            setError(true);
            return;
        }

        const success = await apiHandler.updateDetails(token, projectName);

        if (!error && success) {
            updateData();
            localStorage.setItem("token", token);
            localStorage.setItem("projectName", projectName);
        } else
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
