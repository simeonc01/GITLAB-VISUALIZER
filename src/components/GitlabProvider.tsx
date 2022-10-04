import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ApiHandler } from '../util/api';
import { Branch, GitlabError, IContextDefault, Project, Label, FilterType, BetterCommit, BetterIssue, BetterEvent, Milestone } from '../util/types';
export const GitLabContext = createContext<IContextDefault>(
  {} as IContextDefault
);

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
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [instanciated, setInstanciated] = useState<boolean>(false);
  const [projectLoads, setProjectLoads] = useState<number>(0);

  const apiHandler = new ApiHandler("", "");

  const getCommits = (): BetterCommit[] | null => {
      if (error) return null;
      return filterCommits;
  
    }
  const getBranches = (): Branch[] | null => {
    if (error) return null;
    return branches;
  };

  const getCurrentProject = (): Project | null => {
    if (error) return null;
    return currentProject;
  };

  const getLabels = (): Label[] | null => {
    if (error) return null;
    return labels;
  };

  const getMilestones = (): Milestone[] | null => {
    if (error) return null;
    return milestones;
  };

  useEffect(() => {
    updateOutside();
  }, []);

    const getIssues = (): BetterIssue[] | null => {
        if (error) return null;
        return filterIssues;
    }

    const getEvents = (): BetterEvent[] | null => {
        if (error) return null;
        return filterEvents;
    }
    

    const updateData = () => {
        setLoading(true);
        apiHandler.update().then(data => {
            const c = data.commits.map(c => ({created_at_date: new Date(new Date(c.created_at).setHours(0,0,0,0)), ...c}));
            const i = data.issues.map(i => ({created_at_date: new Date(new Date(i.created_at).setHours(0,0,0,0)), ...i}));
            const e = data.events.map(e => ({created_at_date: new Date(new Date(e.created_at).setHours(0,0,0,0)), ...e}));
            setCommits(c);
            setFilterCommits(c);
            setBranches(data.branches);
            setIssues(i);
            setFilterIssues(i);
            setCurrentProject(data.currentProject);
            setEvents(e);
            setFilterEvents(e);
            setLabels(data.labels);
            setMilestones(data.milestones);
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
        const token = localStorage.getItem("token");
        const projectName = localStorage.getItem("projectName");
        if (token === null || projectName === null) {
            return;
        } else {
            const success = await apiHandler.updateDetails(token, projectName);
            if (success) {
                setInstanciated(true);
                updateData();
            } else {
                setError(true);
                console.error("Context could not update data correctly");
                return
            }
        }
    }

    const updateOutside = async () => {
        setError(false);
        setProjectLoads(projectLoads + 1);
        const token = localStorage.getItem("token");
        const projectName = localStorage.getItem("projectName");
        if (token === null || projectName === null) {
            if (projectLoads > 3)
                setError(true);
            return;
        } else {
            const success = await apiHandler.updateDetails(token, projectName);
            if (success) {
                updateData();
                setInstanciated(true)
                setProjectLoads(0);
            } else {
                setError(true);
                console.error("Context could not update data correctly");
                return
            }
        }
    }

    return (
        <GitLabContext.Provider value={{
            commits: getCommits(),
            branches: getBranches(), 
            issues: getIssues(), 
            currentProject: getCurrentProject(),
            events: getEvents(),
            labels: getLabels(),
            milestones: getMilestones(),
            error,
            loading,
            update,
            instanciated,
            setFilter: setDateFilter
        }}>
            {props.children}
        </GitLabContext.Provider>
    )
}

export default GitlabProvider;
