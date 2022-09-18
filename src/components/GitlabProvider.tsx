import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ApiHandler } from '../util/api';
import { Branch, Commit, GitlabError, IContextDefault, Issue } from '../util/types';


const GtilabContext = createContext<IContextDefault>({} as IContextDefault);

const GitlabProvider = (props: {children?: ReactNode}) => {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [error, setError] = useState<boolean>(false);

    const apiHandler = new ApiHandler("", "");

    const getCommits = (): Commit[] | null => {
        if (error) return null;
        return commits;
    }

    const getBranches = (): Branch[] | null => {
        if (error) return null;
        return branches;
    }

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem("token");
            const projectName = localStorage.getItem("projectName");

            if (token === null || projectName === null) {
                setError(true);
            } else {
                const success = await apiHandler.updateDetails(token, projectName);
                if (success) {
                    apiHandler.update().then(data => {
                        console.log(data);
                        setCommits(data.commits);
                        setBranches(data.branches);
                        setIssues(data.issues);
                    }).catch((err: GitlabError) => {
                        setError(true);
                        console.error("Error in update");
                        console.error(err.message);
                    })
                }
            }
        }

        init();

    }, []);

    const update = async () => {
        if (!error)
            apiHandler.update().then(data => {
                setCommits(data.commits);
                setBranches(data.branches);
                setIssues(data.issues);
            }).catch((error: GitlabError) => {
                console.error("Error updating context data");
                console.error(error.message);
                setError(true);
            });
        else
            console.error("Context is not setup correctly, need a valid Token and projectName")
    }

    return (
        <GtilabContext.Provider value={{commits: getCommits(), branches: getBranches(), issues, error, update}}>
            {props.children}
        </GtilabContext.Provider>
    )
}

export default GitlabProvider;
