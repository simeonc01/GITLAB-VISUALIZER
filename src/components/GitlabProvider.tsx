import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ApiHandler } from '../util/api';
import { Branch, Commit, GitlabError, IContextDefault, Issue, Project, Event, Label, FilterType } from '../util/types';

export const GitLabContext = createContext<IContextDefault>({} as IContextDefault);

const GitlabProvider = (props: {children?: ReactNode}) => {
    const [filter, setFilter] = useState<FilterType>({startDate: null, endDate: null});
    const [commits, setCommits] = useState<Commit[]>([]);
    const [filterCommits, setFilterCommits] = useState<Commit[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [filterIssues, setFilterIssues] = useState<Issue[]>([]);
    const [currentProject, setCurrentProject] = useState<Project>({} as Project);
    const [events, setEvents] = useState<Event[]>([]);
    const [filterEvents, setFilterEvents] = useState<Event[]>([]);
    const [labels, setLabels] = useState<Label[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const apiHandler = new ApiHandler("", "");

    const getCommits = (): Commit[] | null => {
        if (error) return null;
        return filterCommits;
    }

    const getBranches = (): Branch[] | null => {
        if (error) return null;
        return branches;
    }

    const getIssues = (): Issue[] | null => {
        if (error) return null;
        return filterIssues;
    }

    const getCurrentProject = (): Project | null => {
        if (error) return null;
        return currentProject;
    }

    const getEvents = (): Event[] | null => {
        if (error) return null;
        return filterEvents;
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
            setEvents(data.events);
            setLabels(data.labels);
            setLoading(false);
        }).catch((err: GitlabError) => {
            setError(true);
            console.error("Error in update");
            console.error(err.message);
        });
    }

    const listenSessionStorage = (event: StorageEvent): void => {
        if (event.storageArea === sessionStorage) {
            const f = {startDate: sessionStorage.getItem("startDate"), endDate: sessionStorage.getItem("endDate")};
            const filter: FilterType = {
                startDate: null,
                endDate: null
            };
            filter.startDate = f.startDate !== null ? new Date(f.startDate) : null;
            filter.endDate = f.endDate !== null ? new Date(f.endDate) : null;
            setFilter(filter);
        }
    }

    useEffect(() => {
        const filterFunc = (elem: Commit | Issue | Event): boolean => {
            if (filter.startDate === null && filter.endDate !== null) return new Date(elem.created_at) < filter.endDate;
            if (filter.startDate !== null && filter.endDate === null) return new Date(elem.created_at) > filter.startDate;
            const d = new Date(elem.created_at);
            if (filter.startDate !== null && filter.endDate !== null) return d > filter.startDate && d < filter.endDate;
            return true;
        }

        console.log(commits.filter(filterFunc));
        setFilterCommits(commits);
        setFilterIssues(issues);
        setFilterEvents(events);
    }, [filter, commits, issues, events]);

    useEffect(() => {
        update();
        
        window.addEventListener('storage', listenSessionStorage);
        return () => window.removeEventListener('storage', listenSessionStorage);
    }, []);

    const update = async () => {
        setError(false);
        const token = localStorage.getItem("token");
        const projectName = localStorage.getItem("projectName");
        console.log(token, projectName);    
        if (token === null || projectName === null) {
            setError(true);
            return;
        }

        const success = await apiHandler.updateDetails(token, projectName);
        if (!error && success) {
            updateData();
        } else
            console.error("Context is not setup correctly, need a valid Token and projectName")
    }

    return (
        <GitLabContext.Provider value={{
            commits: getCommits(),
            branches: getBranches(), 
            issues: getIssues(), 
            currentProject: getCurrentProject(),
            events: getEvents(),
            labels: getLabels(),
            error,
            loading,
            update
        }}>
            {props.children}
        </GitLabContext.Provider>
    )
}

export default GitlabProvider;
