import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ApiHandler } from '../util/api';
import { Branch, Commit, GitlabError, IContextDefault, Issue, Project, Event, Label, FilterType, BetterCommit, BetterIssue, BetterEvent } from '../util/types';

export const GitLabContext = createContext<IContextDefault>({} as IContextDefault);

const GitlabProvider = (props: {children?: ReactNode}) => {
    const [filter, setFilter] = useState<FilterType>({startDate: null, endDate: null});
    const [filterActive, setFilterActive] = useState<boolean>(false);
    const [commits, setCommits] = useState<BetterCommit[]>([]);
    const [filterCommits, setFilterCommits] = useState<BetterCommit[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [issues, setIssues] = useState<BetterIssue[]>([]);
    const [filterIssues, setFilterIssues] = useState<BetterIssue[]>([]);
    const [currentProject, setCurrentProject] = useState<Project>({} as Project);
    const [events, setEvents] = useState<BetterEvent[]>([]);
    const [filterEvents, setFilterEvents] = useState<BetterEvent[]>([]);
    const [labels, setLabels] = useState<Label[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const apiHandler = new ApiHandler("", "");

    const getCommits = (): BetterCommit[] | null => {
        if (error) return null;
        return filterCommits;
    }

    const getBranches = (): Branch[] | null => {
        if (error) return null;
        return branches;
    }

    const getIssues = (): BetterIssue[] | null => {
        if (error) return null;
        return filterIssues;
    }

    const getCurrentProject = (): Project | null => {
        if (error) return null;
        return currentProject;
    }

    const getEvents = (): BetterEvent[] | null => {
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
            setCommits(data.commits.map(c => ({created_at_date: new Date(new Date(c.created_at).setHours(0,0,0,0)), ...c})));
            setBranches(data.branches);
            setIssues(data.issues.map(i => ({created_at_date: new Date(new Date(i.created_at).setHours(0,0,0,0)), ...i})));
            setCurrentProject(data.currentProject);
            setEvents(data.events.map(e => ({created_at_date: new Date(new Date(e.created_at).setHours(0,0,0,0)), ...e})));
            setLabels(data.labels);
            setLoading(false);
        }).catch((err: GitlabError) => {
            setError(true);
            console.error("Error in update");
            console.error(err.message);
        });
    }

    const setDateFilter = (startDate: Date | null, endDate: Date| null) => {
        if (startDate !== null || endDate !== null) {
            setFilterActive(true);
            setFilter({startDate, endDate});
        } else {
            setFilterActive(false);
            setFilter({startDate: null, endDate: null});
        }
    }

    const filterFunc = (elem: BetterCommit | BetterEvent | BetterIssue) => {
        if (filter.startDate === null && filter.endDate === null) return true;
        else if (filter.startDate !== null && filter.endDate === null) {
            const start = new Date(filter.startDate);
            return elem.created_at_date > start;
        }
        else if (filter.startDate === null && filter.endDate !== null) {
            const end = new Date(filter.endDate);
            return elem.created_at_date < end;
        } else if (filter.startDate !== null && filter.endDate !== null) {
            const start = new Date(filter.startDate);
            const end = new Date(filter.endDate);
            return start < elem.created_at_date && elem.created_at_date < end;
        }
    }

    useEffect(() => {
        if (filterActive) {
            setFilterCommits(commits.filter(filterFunc));
            setFilterIssues(issues.filter(filterFunc));
            setFilterEvents(events.filter(filterFunc));
        }
        else {
            setFilterCommits(commits);
            setFilterIssues(issues);
            setFilterEvents(events);
        }

    }, [filterActive, filter])

    useEffect(() => {
        update();
    }, []);

    const update = async () => {
        setError(false);
        const token = localStorage.getItem("token");
        const projectName = localStorage.getItem("projectName");
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
            update,
            setFilter: setDateFilter
        }}>
            {props.children}
        </GitLabContext.Provider>
    )
}

export default GitlabProvider;
