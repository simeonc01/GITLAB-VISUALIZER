// gitlab types
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
    authored_date: string;
    committed_date: string;
    committer_email: string;
    committer_name: string;
    created_at: string;
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

export type Project = {
    _links: object;
    allow_merge_on_skipped_pipeline: any;
    analytics_access_level: string;
    archived: boolean;
    auto_cancel_pending_pipelines: string;
    auto_devops_deploy_strategy: string;
    auto_devops_enabled: boolean;
    autoclose_referenced_issues: boolean;
    avatar_url: string | null;
    build_timeout: number;
    builds_access_level: string;
    can_create_merge_request_in: boolean;
    ci_allow_fork_pipelines_to_run_in_parent_project: boolean;
    ci_config_path: string;
    ci_default_git_depth: number;
    ci_forward_deployment_enabled: boolean;
    ci_job_token_scope_enabled: boolean;
    ci_opt_in_jwt: boolean;
    ci_separated_caches: boolean;
    container_expiration_policy: object;
    container_registry_access_level: string;
    container_registry_enabled: boolean;
    container_registry_image_prefix: string;
    created_at: string;
    creator_id: number;
    default_branch: string;
    description: string | null;
    emails_disabled: string | null;
    empty_repo: boolean;
    enforce_auth_checks_on_uploads: boolean;
    forked_from_project: object;
    forking_access_level: string;
    forks_count: number;
    http_url_to_repo: string;
    id: number;
    import_status: string;
    issues_access_level: string;
    issues_enabled: string;
    jobs_enabled: string;
    keep_latest_artifact: string;
    last_activity_at: string;
    lfs_enabled: boolean;
    merge_commit_template: string | null;
    merge_method: string;
    merge_requests_access_level: string;
    merge_requests_enabled: boolean;
    mr_default_target_self: boolean;
    name: string;
    name_with_namespace: string;
    namescape: object;
    only_allow_merge_if_all_discussions_are_resolved: boolean;
    only_allow_merge_if_pipeline_succeeds: boolean;
    open_issues_count: number;
    operations_access_level: string;
    owner: Author;
    packages_enabled: boolean;
    pages_access_level: string;
    path: string;
    path_with_namespace: string;
    permissions: object;
    printing_merge_request_link_enabled: boolean;
    public_jobs: boolean;
    readme_url: string | null;
    remove_source_branch_after_merge: boolean;
    repository_access_level: string;
    request_access_enabled: boolean;
    resolve_outdated_diff_discussions: boolean;
    restrict_user_defined_variables: boolean;
    runner_token_expiration_interval: string | null;
    security_and_compliance_access_level: string;
    service_desk_enabled: boolean;
    shared_runners_enabled: boolean;
    shared_with_groups: [];
    snippets_access_level: string;
    snippets_enabled: boolean;
    squash_commit_template: string | null;
    squash_option: string;
    ssh_url_to_repo: string;
    star_count: number;
    suggestion_commit_message: string | null;
    tag_list: [];
    topics: [];
    visibility: string;
    web_url: string;
    wiki_access_level: string | null;
    wiki_enabled: boolean;
}


export type Event = {
    id: number;
    title: string | null;
    project_id: number;
    action_name: string;
    target_id: number;
    target_type: string;
    author_id: number;
    target_title: string;
    created_at: string;
    author: Author;
    author_username: string;
}

export type Label = {
    id: number;
    name: string;
    color: string;
    text_color: string;
    description: string;
    description_html: string;
    open_issue_count: number;
    closed_issues_count: number;
    open_merge_requests_count: number;
    subscribed: boolean;
    priority: string | null;
    is_project_label: boolean;
}

// other types
export interface IContextDefault {
    commits: Commit[] | null;
    branches: Branch[] | null;
    issues: Issue[] | null;
    labels: Label[] | null;
    currentProject: Project | null;
    events: Event[] | null;
    error: boolean;
    loading: boolean;
    update: () => void;
}

export type UpdateData = {
    commits: Commit[];
    branches: Branch[];
    issues: Issue[];
    currentProject: Project;
    events: Event[];
    labels: Label[];
}

export type GitlabError = {
    message: string;
    data: object | null;
}

// recharts types
export type LineType = {
    dataKey: string;
    stroke?: string;
}

export type FilterType = {
    startDate: Date | null;
    endDate: Date | null;
}