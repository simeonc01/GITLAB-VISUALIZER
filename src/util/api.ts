import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { Branch, Commit, Issue, Project, UpdateData } from './types';

function wrapPromise<T>(axios: AxiosPromise<T>) {
    return new Promise<T>((resolve, reject) => {
        axios
            .then((d) => {
                resolve(d.data);
            })
        .catch(async (error) => {
            if (error.response) {
                reject(error.response.data.message);
            } else {
                reject(error.message);
            }
        });
    });
}

export class ApiHandler {
    private readonly handler: AxiosInstance;
    private id = -1;
    private projectString: string;
    private originalProjectString: string;
    private initialized = false;
    private token: string;

    constructor(token: string, projectString: string) {
        this.originalProjectString = projectString;
        const r = projectString.match(/(?<=\.no\/)[^\]]+/);
        this.projectString = encodeURIComponent(r !== null ? r[0] : "");
        this.token = token;
        this.handler = axios.create({
            baseURL: `https://gitlab.stud.idi.ntnu.no/api/v4`,
            timeout: 3000,
            headers: {
                'PRIVATE-TOKEN': token
            }
        });
    }

    public async update(): Promise<UpdateData> {
        return new Promise<UpdateData>((resolve, reject) => {
            Promise.all([
                this.getCommits(),
                this.getBranches(),
                this.getIssues(),
                this.getCurrentProject()
            ]).then(data => {
                resolve({
                    commits: data[0],
                    branches: data[1],
                    issues: data[2],
                    currentProject: data[3]
                });
            }).catch(error => {
                reject({
                    message: error,
                    data: null
                });
            });
        })
    }

    private async getProjectId(projectString: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${encodeURIComponent(projectString)}`, {
                headers: {
                    'PRIVATE-TOKEN': this.token
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then((d: Project) => resolve(d.id));
                } else
                    reject(-1);
            })

        });
    }

    public async getCurrentProject(): Promise<Project> {
        if (this.id < 0)
            return Promise.reject<Project>({
                message: "Project ID was not set", 
                data: null
            });
        return wrapPromise<Project>(this.handler.get(`/projects/${this.id}`, {
            validateStatus: (status) => status === 200,
            headers: {
                'PRIVATE-TOKEN': this.token
            }
        }));
    }

    public updateDetails(token: string, projectString: string) {
        if (this.token === token && this.originalProjectString === projectString) return false;
        this.token = token;
        this.handler.defaults.headers.common["PRIVATE-TOKEN"] = this.token;
        console.log(this.handler.defaults.headers.common["PRIVATE-TOKEN"]);
        const r = projectString.match(/(?<=\.no\/)[^\]]+/);
        if (r !== null) this.projectString = r[0];
        else this.projectString = "";
        this.getProjectId(this.projectString).then(d => this.id = d);
        return true;
    }

    public async getProjects(page?: number): Promise<Project[]> {
        if (page) {
            return wrapPromise<Project[]>(this.handler.get(`/projects?per_page=100&page=${page}`));
        }

        return wrapPromise<Project[]>(this.handler.get(`/projects?per_page=100`));
    }

    public async getCommits(): Promise<Commit[]> {
        if (this.id < 0)
            return Promise.reject<Commit[]>({
                message: "Project ID was not set", 
                data: null
            });

        return wrapPromise<Commit[]>(
            this.handler.get(`/projects/${this.id}/repository/commits?per_page=100`, {
                validateStatus: (code: number) => code === 200,
                headers: {
                    'PRIVATE-TOKEN': this.token
                }
            })
        );
    }

    public async getIssues(): Promise<Issue[]> {
        if (this.id < 0)
            return Promise.reject<Issue[]>({
                message: "Project ID was not set", 
                data: null
            });
        
        return wrapPromise<Issue[]>(
            this.handler.get(`/projects/${this.id}/issues?per_page=100`, {
                validateStatus: (code: number) => code === 200,
                headers: {
                    'PRIVATE-TOKEN': this.token
                }
            })
        );
    }

    public async getBranches(): Promise<Branch[]> {
        if (this.id < 0)
            return Promise.reject<Branch[]>({
                message: "Project ID was not set", 
                data: null
            });
        
        return wrapPromise<Branch[]>(
            this.handler.get(`/projects/${encodeURIComponent(this.id)}/repository/branches?per_page=100`, {
                validateStatus: (code: number) => code === 200,
                headers: {
                    'PRIVATE-TOKEN': this.token
                }
            })
        );
    }
}