export type Author = {
    state: string;
    id: number;
    web_url: string;
    name: string;
    avatar_url: string | null;
    username: string;
}

export type Reference =  {
    short: string;
    relative: string;
    full: string;
}

export type Milestone = {
    created_at: Date;
    description: string;
    due_date: string | null;
    expired: boolean;
    id: number;
    iid: number;
    project_id: string;
    start_date: string;
    state: string;
    title: string;
    updated_at: Date;
    web_url: string;
}

export type Commit = {
    author_email: string;
    author_name: string;
    authored_date: Date;
    comitted_date: Date;
    comitter_email: string;
    commiter_name: string;
    created_at: Date;
    id: string;
    message: string;
    parent_ids: string[];
    short_id: string;
    title: string;
    trailers: object;
    web_url: string;
}

export type Branch = {
    can_push: boolean;
    commit: Commit;
    default: boolean;
    developers_can_merge: boolean;
    developers_can_push: boolean;
    merged: boolean;
    name: string;
    protected: boolean;
    web_url: string;
}

export type Issue = {
    _links: object;
    assignee: Author;
    assignees: Author[];
    author: Author;
    closed_at: Date | null;
    closed_by: Author;
    confidential: boolean;
    created_at: Date;
    description: string;
    discussion_locked: boolean | null;
    downvotes: number;
    due_date: string | null;
    has_tasks: boolean;
    id: number;
    iid: number;
    issue_type: string;
    labels: string[];
    merge_request_count: number;
    milestone: Milestone;
    moved_to_id: number | null;
    project_id: number;
    references: Reference;
    service_desk_reply_to: string | null;
    severity: string;
    state: string;
    task_completion_status: object;
    time_stats: object;
    title: string;
    type: string;
    updated_at: Date;
    upvotes: number;
    user_notes_count: number;
    web_url: string;
}

export interface IContextDefault {
    commits: Commit[];
    branches: Branch[];
    issues: Issue[];
    update: (commits: Commit[], branches: Branch[], issues: Issue[]) => void;
}