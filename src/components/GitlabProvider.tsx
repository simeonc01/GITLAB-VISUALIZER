import React, { createContext, ReactNode, useState } from 'react';
import { Branch, Commit, IContextDefault, Issue } from '../util/types';


const GtilabContext = createContext<IContextDefault>({
    commits: [],
    branches: [],
    issues: [],
    update: () => { return; }
} as IContextDefault);

const GitlabProvider = (props: {children?: ReactNode}) => {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [issues, setIssues] = useState<Issue[]>([]);
    
    // TODO: Change update to only need to called to update local data
    const update = (commits: Commit[], branches: Branch[], issues: Issue[]) => {
        setCommits(commits);
        setBranches(branches);
        setIssues(issues);
    }

    return (
        <GtilabContext.Provider value={{commits, branches, issues, update}}>
            {props.children}
        </GtilabContext.Provider>
    )
}

export default GitlabProvider;
