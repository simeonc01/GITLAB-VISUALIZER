import Box from '@mui/material/Box';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Author, Branch, Commit, GitlabError, IContextDefault, Issue } from '../util/types';
import { ApiHandler } from '../util/api';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';


/*
const getBranches = (): Branch[] | null => {
    if (error) return null;
    return branches;
}

Filtrere på brukernavn feks?

To keep track of the recent actions in the project.

The time/date
The member who did the action
What has been done? (new branch, new issue, new commit etc.)
*/

const GtilabActivityContext = createContext<IContextDefault>({} as IContextDefault);

const Activity = (props: {children?: ReactNode}) => {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [author, setAuthor] = useState<Author[]>();
    const [branches, setBranches] = useState<Branch[]>([]);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [error, setError] = useState<boolean>(false);

    const apiHandler = new ApiHandler("", "");

    //Fra GitlabProvider
    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem("token");
            const projectName = localStorage.getItem("projectName");

            if (token === null || projectName === null) {
                setError(true);
            } else {
                const success = await apiHandler.updateDetails(token, projectName);
                if (success) {
                    //Må velge en author? 
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

    //fra GitlabProvider
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

    //Hvordan vil vi presentere
    return(
        <div className="justify-content-center allign-items-center d-flex ">
            <h1>Commits</h1>
            <BarChart width={800} height={300} data={author}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={commits.map} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="1" fill="red" />
                <Bar dataKey="2" fill="blue" />
                <Bar dataKey="3" fill="green" />
                <Bar dataKey="4" fill="yellow" />
            </BarChart>

            <h1>Issues</h1>
            <BarChart width={800} height={300} data={author}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={issues.map} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="1" fill="red" />
                <Bar dataKey="2" fill="blue" />
                <Bar dataKey="3" fill="green" />
                <Bar dataKey="4" fill="yellow" />
            </BarChart>

            <h1>Branches created</h1>
            <BarChart width={800} height={300} data={author}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={branches.map} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="1" fill="red" />
                <Bar dataKey="2" fill="blue" />
                <Bar dataKey="3" fill="green" />
                <Bar dataKey="4" fill="yellow" />
            </BarChart>
        </div>
    )
}


export default Activity; 
