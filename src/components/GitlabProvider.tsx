import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ApiHandler } from '../util/api';
import { Branch, Commit, GitlabError, IContextDefault, Issue, Label, Project } from '../util/types';


export const GitLabContext = createContext<IContextDefault>({} as IContextDefault);

const GitlabProvider = (props: {children?: ReactNode}) => {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [currentProject, setCurrentProject] = useState<Project>({} as Project);
    const [labels, setLabels] = useState<Label[]>([]);
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

    const getLabels = (): Label[] | null => {
        if (error) return null;
        return labels;
    }

    const updateData = () => {
        setLoading(true);
        apiHandler.update().then(data => {
            setCommits(data.commits);
            setBranches(data.branches);
            setIssues(data.issues);
            setCurrentProject(data.currentProject);
            setLabels(data.labels);
            setLoading(false);
        }).catch((err: GitlabError) => {
            setError(true);
            console.error("Error in update");
            console.error(err.message);
        });
    }

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem("token");
            const projectName = localStorage.getItem("projectName");

            if (token === null || projectName === null) {
                setError(true);
            } else {
                const success = await apiHandler.updateDetails(token, projectName);

                if (success) updateData();
            }
        }

        init();

    }, []);

    const update = async () => {
        
        if (!error)
            updateData();
        else
            console.error("Context is not setup correctly, need a valid Token and projectName")
    }

    return (
        <GitLabContext.Provider value={{
            commits: getCommits(),
            branches: getBranches(), 
            issues: getIssues(), 
            labels: getLabels(),
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
